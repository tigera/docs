import React, { useState, useMemo, useEffect, useRef } from 'react';

const SAMPLE = [
  { src: 'front',  dest: 'cart',   svc: 'cart-svc',   method: 'GET',  url: '/cart',   code: '200', ua: 'client', protocol: 'http', sni: null },
  { src: 'front',  dest: 'cart',   svc: 'cart-svc',   method: 'GET',  url: '/cart',   code: '404', ua: 'client', protocol: 'http', sni: null },
  { src: 'front',  dest: 'cart',   svc: 'cart-svc',   method: 'GET',  url: '/items',  code: '200', ua: 'client', protocol: 'http', sni: null },
  { src: 'front',  dest: 'cart',   svc: 'cart-svc',   method: 'POST', url: '/cart',   code: '200', ua: 'client', protocol: 'http', sni: null },
  { src: 'orders', dest: 'pay',    svc: 'pay-svc',    method: 'POST', url: '/charge', code: '200', ua: 'sdk',    protocol: 'http', sni: null },
  { src: 'edge',   dest: 'pay',    svc: 'pay-svc',    method: 'POST', url: '/charge', code: '200', ua: 'sdk',    protocol: 'http', sni: null },
  { src: 'orders', dest: 'canary', svc: 'pay-svc',    method: 'POST', url: '/charge', code: '200', ua: 'sdk',    protocol: 'http', sni: null },
  { src: 'orders', dest: 'pay',    svc: 'pay-v2-svc', method: 'POST', url: '/charge', code: '200', ua: 'sdk',    protocol: 'http', sni: null },
  { src: 'prom',   dest: 'kibana', svc: 'kibana-svc', method: null,   url: null,      code: null,  ua: null,     protocol: 'tls',  sni: 'kibana.svc' },
  { src: 'prom',   dest: 'kibana', svc: 'kibana-svc', method: null,   url: null,      code: null,  ua: null,     protocol: 'tls',  sni: 'es.svc' },
];

const AGGREGATORS = [
  { id: 'source',  label: 'Source info',      fields: ['src'],    field: 'L7LogsFileAggregationSourceInfo' },
  { id: 'dest',    label: 'Destination info', fields: ['dest'],   field: 'L7LogsFileAggregationDestinationInfo' },
  { id: 'service', label: 'Service info',     fields: ['svc'],    field: 'L7LogsFileAggregationServiceInfo' },
  { id: 'method',  label: 'HTTP method',      fields: ['method'], field: 'L7LogsFileAggregationHTTPMethod' },
  { id: 'url',     label: 'URL',              fields: ['url'],    field: 'L7LogsFileAggregationTrimURL' },
  { id: 'code',    label: 'Response code',    fields: ['code'],   field: 'L7LogsFileAggregationResponseCode' },
  { id: 'header',  label: 'HTTP header info', fields: ['ua'],     field: 'L7LogsFileAggregationHTTPHeaderInfo' },
  { id: 'tlssni',  label: 'TLS SNI',          fields: ['sni'],    field: 'L7LogsFileAggregationTLSSNI' },
];

const COLUMNS = [
  { key: 'protocol', label: 'protocol',          owner: null },
  { key: 'src',      label: 'src_name_aggr',     owner: 'source' },
  { key: 'dest',     label: 'dest_name_aggr',    owner: 'dest' },
  { key: 'svc',      label: 'dest_service_name', owner: 'service' },
  { key: 'method',   label: 'method',            owner: 'method' },
  { key: 'url',      label: 'url',               owner: 'url' },
  { key: 'code',     label: 'response_code',     owner: 'code' },
  { key: 'ua',       label: 'user_agent',        owner: 'header' },
  { key: 'sni',      label: 'tls_sni',           owner: 'tlssni' },
];

const HIGHLIGHT_MS = 1500;

export default function L7AggregationSandbox() {
  const [checked, setChecked] = useState(
    Object.fromEntries(AGGREGATORS.map((a) => [a.id, true])),
  );

  const displayedRows = useMemo(() => {
    const bucketKeys = SAMPLE.map((row) => {
      const parts = [`protocol:${row.protocol}`];
      for (const a of AGGREGATORS) {
        if (!checked[a.id]) continue;
        for (const f of a.fields) parts.push(`${f}:${row[f] ?? ''}`);
      }
      return parts.join('|');
    });

    const bucketCounts = new Map();
    const bucketOrder = new Map();
    let nextBucketIdx = 0;
    for (const k of bucketKeys) {
      bucketCounts.set(k, (bucketCounts.get(k) || 0) + 1);
      if (!bucketOrder.has(k)) {
        bucketOrder.set(k, nextBucketIdx++);
      }
    }
    const primaryRowForBucket = new Map();

    const rows = SAMPLE.map((row, originalIdx) => {
      const k = bucketKeys[originalIdx];
      if (!primaryRowForBucket.has(k)) primaryRowForBucket.set(k, originalIdx);
      const primaryOrigIdx = primaryRowForBucket.get(k);
      const isPrimary = primaryOrigIdx === originalIdx;
      const bucketIdx = bucketOrder.get(k);
      const bucketSize = bucketCounts.get(k);
      const out = {
        originalIdx,
        bucketIdx,
        primaryOrigIdx,
        bucketSize,
        count: isPrimary ? bucketSize : '',
        __primary: isPrimary,
      };
      for (const col of COLUMNS) {
        out[col.key] =
          col.owner && !checked[col.owner] ? '—' : row[col.key] ?? '—';
      }
      return out;
    });

    rows.sort((a, b) => {
      if (a.bucketIdx !== b.bucketIdx) return a.bucketIdx - b.bucketIdx;
      return a.originalIdx - b.originalIdx;
    });

    return rows;
  }, [checked]);

  const prevRef = useRef(displayedRows);
  const [highlights, setHighlights] = useState(() => new Map());
  const [expanded, setExpanded] = useState(() => new Set());

  const toggleExpand = (originalIdx) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(originalIdx)) next.delete(originalIdx);
      else next.add(originalIdx);
      return next;
    });
  };

  const visibleRows = displayedRows.filter(
    (row) => row.__primary || expanded.has(row.primaryOrigIdx),
  );

  useEffect(() => {
    const newHL = new Map();
    const prevByOrigIdx = new Map();
    for (const r of prevRef.current) {
      prevByOrigIdx.set(r.originalIdx, r);
    }
    const HIGHLIGHTABLE = ['count', ...COLUMNS.map((c) => c.key)];
    const numOrZero = (v) => (typeof v === 'number' ? v : 0);
    for (const row of displayedRows) {
      const prev = prevByOrigIdx.get(row.originalIdx) || {};
      for (const k of HIGHLIGHTABLE) {
        if (row[k] === prev[k]) continue;
        let direction;
        if (k === 'count') {
          direction = numOrZero(row[k]) > numOrZero(prev[k]) ? 'add' : 'remove';
        } else {
          direction = row[k] === '—' ? 'remove' : 'add';
        }
        newHL.set(`${row.originalIdx}:${k}`, direction);
      }
    }
    prevRef.current = displayedRows;
    setHighlights(newHL);
    if (newHL.size === 0) return;
    const t = setTimeout(() => setHighlights(new Map()), HIGHLIGHT_MS);
    return () => clearTimeout(t);
  }, [displayedRows]);

  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));

  const ROW_HEIGHT = '3.2em';
  const baseCellStyle = {
    padding: '4px 8px',
    fontFamily: 'var(--ifm-font-family-monospace)',
    fontSize: '0.85em',
    overflowWrap: 'anywhere',
    verticalAlign: 'top',
    transition: 'background-color 1s ease',
    height: ROW_HEIGHT,
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
  };
  const cellStyleFor = (rowIdx, key) => {
    const direction = highlights.get(`${rowIdx}:${key}`);
    if (direction === 'add') {
      return {
        ...baseCellStyle,
        backgroundColor: 'var(--ifm-color-success-contrast-background)',
      };
    }
    if (direction === 'remove') {
      return {
        ...baseCellStyle,
        backgroundColor: 'var(--ifm-color-danger-contrast-background)',
      };
    }
    return baseCellStyle;
  };
  const headerStyle = {
    ...baseCellStyle,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    transition: 'none',
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 16px',
          margin: '12px 0',
          padding: '12px',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: '4px',
        }}
      >
        {AGGREGATORS.map((a) => (
          <label
            key={a.id}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={checked[a.id]}
              onChange={() => toggle(a.id)}
            />
            <span>{a.label}</span>
          </label>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          margin: '8px 0',
          fontSize: '0.85em',
          opacity: 0.8,
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              display: 'inline-block',
              width: '0.9em',
              height: '0.9em',
              backgroundColor: 'var(--ifm-color-success-contrast-background)',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '2px',
            }}
          />
          added (value gained or count up)
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              display: 'inline-block',
              width: '0.9em',
              height: '0.9em',
              backgroundColor: 'var(--ifm-color-danger-contrast-background)',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '2px',
            }}
          />
          removed (value lost or count down)
        </span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ tableLayout: 'fixed', width: '100%' }}>
          <colgroup>
            <col style={{ width: '10%' }} />
            {COLUMNS.map((c) => (
              <col key={c.key} style={{ width: `${90 / COLUMNS.length}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th style={headerStyle}>count</th>
              {COLUMNS.map((c) => (
                <th key={c.key} style={headerStyle}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, displayIdx) => {
              const prevRow = visibleRows[displayIdx - 1];
              const isBucketStart =
                !prevRow || prevRow.bucketIdx !== row.bucketIdx;
              const borderTop = isBucketStart && displayIdx > 0
                ? '2px solid var(--ifm-color-emphasis-300)'
                : undefined;
              const styleForCell = (key) => {
                const base = cellStyleFor(row.originalIdx, key);
                return borderTop ? { ...base, borderTop } : base;
              };
              const rowOpacity = row.__primary ? 1 : 0.7;
              const isExpandable = row.__primary && row.bucketSize > 1;
              const isOpen = expanded.has(row.originalIdx);
              return (
                <tr
                  key={row.originalIdx}
                  style={{
                    height: ROW_HEIGHT,
                    opacity: rowOpacity,
                    transition: 'opacity 0.4s ease',
                    backgroundColor: 'transparent',
                  }}
                >
                  <td style={{ ...styleForCell('count'), fontWeight: row.__primary ? 600 : 400 }}>
                    {isExpandable ? (
                      <button
                        type="button"
                        onClick={() => toggleExpand(row.originalIdx)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '1.5em',
                          height: '1.5em',
                          marginRight: 6,
                          padding: 0,
                          background: 'var(--ifm-color-emphasis-100)',
                          border: '1px solid var(--ifm-color-emphasis-400)',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          color: 'var(--ifm-color-emphasis-800)',
                          fontFamily: 'inherit',
                          fontSize: '1em',
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                        aria-label={isOpen ? 'Collapse group' : 'Expand group'}
                      >
                        {isOpen ? '−' : '+'}
                      </button>
                    ) : null}
                    {row.count}
                  </td>
                  {COLUMNS.map((c) => (
                    <td key={c.key} style={styleForCell(c.key)}>{row[c.key]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
