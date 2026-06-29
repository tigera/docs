import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './styles.module.css';

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
const FADED_ROW_OPACITY = 0.7;
const DATA_COL_WIDTH = `${90 / COLUMNS.length}%`;
const COUNT_COL_WIDTH = '10%';

const cx = (...names) => names.filter(Boolean).join(' ');

export default function L7AggregationKeyDemo() {
  const [checked, setChecked] = useState(() =>
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

  const visibleRows = useMemo(
    () => displayedRows.filter(
      (row) => row.__primary || expanded.has(row.primaryOrigIdx),
    ),
    [displayedRows, expanded],
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
    if (newHL.size === 0 && highlights.size === 0) return;
    setHighlights(newHL);
    if (newHL.size === 0) return;
    const t = setTimeout(() => setHighlights(new Map()), HIGHLIGHT_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedRows]);

  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));

  const cellClassFor = (rowIdx, key, extra) => {
    const direction = highlights.get(`${rowIdx}:${key}`);
    return cx(
      styles.cell,
      direction === 'add' && styles.cellAdd,
      direction === 'remove' && styles.cellRemove,
      extra,
    );
  };

  return (
    <div>
      <div className={styles.controls}>
        {AGGREGATORS.map((a) => (
          <label key={a.id} className={styles.controlLabel}>
            <input
              type="checkbox"
              checked={checked[a.id]}
              onChange={() => toggle(a.id)}
            />
            <span>{a.label}</span>
          </label>
        ))}
      </div>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={cx(styles.legendSwatch, styles.legendSwatchAdd)} />
          added (value gained or count up)
        </span>
        <span className={styles.legendItem}>
          <span className={cx(styles.legendSwatch, styles.legendSwatchRemove)} />
          removed (value lost or count down)
        </span>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <colgroup>
            <col style={{ width: COUNT_COL_WIDTH }} />
            {COLUMNS.map((c) => (
              <col key={c.key} style={{ width: DATA_COL_WIDTH }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className={cx(styles.cell, styles.header)}>count</th>
              {COLUMNS.map((c) => (
                <th key={c.key} className={cx(styles.cell, styles.header)}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, displayIdx) => {
              const prevRow = visibleRows[displayIdx - 1];
              const isBucketStart =
                !prevRow || prevRow.bucketIdx !== row.bucketIdx;
              const bucketStartClass = isBucketStart && displayIdx > 0
                ? styles.bucketStart
                : null;
              const isExpandable = row.__primary && row.bucketSize > 1;
              const isOpen = expanded.has(row.originalIdx);
              return (
                <tr
                  key={row.originalIdx}
                  className={styles.row}
                  style={{ opacity: row.__primary ? 1 : FADED_ROW_OPACITY }}
                >
                  <td
                    className={cellClassFor(row.originalIdx, 'count', bucketStartClass)}
                    style={{ fontWeight: row.__primary ? 600 : 400 }}
                  >
                    {isExpandable ? (
                      <button
                        type="button"
                        onClick={() => toggleExpand(row.originalIdx)}
                        className={styles.expandBtn}
                        aria-label={isOpen ? 'Collapse group' : 'Expand group'}
                      >
                        {isOpen ? '−' : '+'}
                      </button>
                    ) : null}
                    {row.count}
                  </td>
                  {COLUMNS.map((c) => (
                    <td
                      key={c.key}
                      className={cellClassFor(row.originalIdx, c.key, bucketStartClass)}
                    >
                      {row[c.key]}
                    </td>
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
