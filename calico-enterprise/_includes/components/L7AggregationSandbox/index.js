import React, { useState, useMemo } from 'react';

const SAMPLE = [
  { src: 'frontend', dest: 'cart',        svc: 'cart',     method: 'GET',  url: '/cart',     code: '200', ua: 'cart-client/1.0', protocol: 'http', sni: null },
  { src: 'frontend', dest: 'cart',        svc: 'cart',     method: 'GET',  url: '/cart',     code: '200', ua: 'curl/8.0',        protocol: 'http', sni: null },
  { src: 'frontend', dest: 'cart',        svc: 'cart',     method: 'PUT',  url: '/cart',     code: '200', ua: 'cart-client/1.0', protocol: 'http', sni: null },
  { src: 'frontend', dest: 'cart',        svc: 'cart',     method: 'GET',  url: '/products', code: '200', ua: 'cart-client/1.0', protocol: 'http', sni: null },
  { src: 'frontend', dest: 'cart',        svc: 'cart',     method: 'GET',  url: '/cart',     code: '404', ua: 'cart-client/1.0', protocol: 'http', sni: null },
  { src: 'checkout', dest: 'cart',        svc: 'cart',     method: 'GET',  url: '/cart',     code: '200', ua: 'cart-client/1.0', protocol: 'http', sni: null },
  { src: 'frontend', dest: 'cart-canary', svc: 'cart',     method: 'GET',  url: '/cart',     code: '200', ua: 'cart-client/1.0', protocol: 'http', sni: null },
  { src: 'frontend', dest: 'cart',        svc: 'cart-v2',  method: 'GET',  url: '/cart',     code: '200', ua: 'cart-client/1.0', protocol: 'http', sni: null },
  { src: 'frontend', dest: 'cart',        svc: 'cart',     method: null,   url: null,        code: null,  ua: null,              protocol: 'tls',  sni: 'cart.default.svc' },
  { src: 'frontend', dest: 'cart',        svc: 'cart',     method: null,   url: null,        code: null,  ua: null,              protocol: 'tls',  sni: 'payment.default.svc' },
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

export default function L7AggregationSandbox() {
  const [checked, setChecked] = useState(
    Object.fromEntries(AGGREGATORS.map((a) => [a.id, true])),
  );

  const aggregated = useMemo(() => {
    const buckets = new Map();
    for (const row of SAMPLE) {
      const keyParts = [`protocol:${row.protocol}`];
      for (const a of AGGREGATORS) {
        if (!checked[a.id]) continue;
        for (const f of a.fields) {
          keyParts.push(`${f}:${row[f] ?? ''}`);
        }
      }
      const key = keyParts.join('|');
      if (buckets.has(key)) {
        buckets.get(key).count += 1;
      } else {
        buckets.set(key, { ...row, count: 1 });
      }
    }
    return Array.from(buckets.values());
  }, [checked]);

  const toggle = (id) =>
    setChecked((c) => ({ ...c, [id]: !c[id] }));

  const cellValue = (row, col) => {
    if (col.owner && !checked[col.owner]) return '—';
    return row[col.key] ?? '—';
  };

  const cellStyle = {
    padding: '4px 8px',
    fontFamily: 'var(--ifm-font-family-monospace)',
    fontSize: '0.85em',
    overflowWrap: 'anywhere',
    verticalAlign: 'top',
  };
  const headerStyle = {
    ...cellStyle,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
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
      <div style={{ overflowX: 'auto' }}>
        <table style={{ tableLayout: 'fixed', width: '100%' }}>
          <colgroup>
            {COLUMNS.map((c) => (
              <col key={c.key} style={{ width: `${90 / COLUMNS.length}%` }} />
            ))}
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c.key} style={headerStyle}>{c.label}</th>
              ))}
              <th style={headerStyle}>count</th>
            </tr>
          </thead>
          <tbody>
            {aggregated.map((row, i) => (
              <tr key={i}>
                {COLUMNS.map((c) => (
                  <td key={c.key} style={cellStyle}>{cellValue(row, c)}</td>
                ))}
                <td style={cellStyle}>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: '0.9em', opacity: 0.7, marginTop: 8 }}>
        Uncheck a field to drop it from the aggregation key. Rows that differ only in dropped fields merge, and the <code>count</code> column increments accordingly.
      </p>
    </div>
  );
}
