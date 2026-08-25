import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './styles.module.css';

const cx = (...names) => names.filter(Boolean).join(' ');

// HTTP-only sample so every aggregation toggle maps to a real FelixConfiguration
// field, keeping the rendered configuration block accurate.
const SAMPLE = [
  { src: 'frontend', dest: 'cart',   method: 'GET',  url: '/cart',   code: '200' },
  { src: 'frontend', dest: 'cart',   method: 'GET',  url: '/cart',   code: '404' },
  { src: 'frontend', dest: 'cart',   method: 'GET',  url: '/items',  code: '200' },
  { src: 'frontend', dest: 'cart',   method: 'POST', url: '/cart',   code: '200' },
  { src: 'orders',   dest: 'pay',    method: 'POST', url: '/charge', code: '200' },
  { src: 'edge',     dest: 'pay',    method: 'POST', url: '/charge', code: '200' },
  { src: 'orders',   dest: 'canary', method: 'POST', url: '/charge', code: '200' },
];

// Each aggregator toggles one field in the aggregation key and maps to a real
// FelixConfiguration field with its include/exclude values.
const AGGREGATORS = [
  { id: 'source', label: 'Source info',   field: 'src',    yaml: 'l7LogsFileAggregationSourceInfo',      inc: 'IncludeL7SourceInfo',      exc: 'ExcludeL7SourceInfo' },
  { id: 'dest',   label: 'Destination info', field: 'dest', yaml: 'l7LogsFileAggregationDestinationInfo', inc: 'IncludeL7DestinationInfo', exc: 'ExcludeL7DestinationInfo' },
  { id: 'method', label: 'HTTP method',    field: 'method', yaml: 'l7LogsFileAggregationHTTPMethod',      inc: 'IncludeL7HTTPMethod',      exc: 'ExcludeL7HTTPMethod' },
  { id: 'url',    label: 'URL',            field: 'url',    yaml: 'l7LogsFileAggregationTrimURL',         inc: 'IncludeL7FullURL',         exc: 'ExcludeL7URL' },
  { id: 'code',   label: 'Response code',  field: 'code',   yaml: 'l7LogsFileAggregationResponseCode',    inc: 'IncludeL7ResponseCode',    exc: 'ExcludeL7ResponseCode' },
];

// Maps each raw field to the log key it surfaces under, in log output order.
const LOG_KEYS = [
  { id: 'source', field: 'src',    key: 'src_name_aggr' },
  { id: 'dest',   field: 'dest',   key: 'dest_name_aggr' },
  { id: 'method', field: 'method', key: 'method' },
  { id: 'url',    field: 'url',    key: 'url' },
  { id: 'code',   field: 'code',   key: 'response_code' },
];

const RAW_COLUMNS = LOG_KEYS.map((k) => ({ field: k.field, label: k.key }));
const STATIC_CONFIG = [
  'apiVersion: projectcalico.org/v3',
  'kind: FelixConfiguration',
  'metadata:',
  '  name: default',
  'spec:',
  '  l7LogsFileEnabled: true',
];
const HIGHLIGHT_MS = 1500;

export default function AggregationKeyDemo() {
  const [checked, setChecked] = useState(() =>
    Object.fromEntries(AGGREGATORS.map((a) => [a.id, true])),
  );

  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));

  // Aggregate the raw requests into buckets keyed by the included fields.
  const logEntries = useMemo(() => {
    const order = [];
    const buckets = new Map();
    for (const row of SAMPLE) {
      const keyParts = AGGREGATORS
        .filter((a) => checked[a.id])
        .map((a) => `${a.field}:${row[a.field]}`);
      const k = keyParts.join('|');
      if (!buckets.has(k)) {
        const entry = { count: 0 };
        for (const lk of LOG_KEYS) {
          entry[lk.key] = checked[lk.id] ? row[lk.field] : '-';
        }
        buckets.set(k, entry);
        order.push(k);
      }
      buckets.get(k).count += 1;
    }
    return order.map((k) => buckets.get(k));
  }, [checked]);

  const logText = useMemo(
    () => logEntries.map((e) => JSON.stringify(e)).join('\n'),
    [logEntries],
  );

  // Highlight the config lines whose include/exclude value just changed.
  const prevChecked = useRef(checked);
  const [highlighted, setHighlighted] = useState(() => new Set());
  useEffect(() => {
    const changed = new Set(
      AGGREGATORS.map((a) => a.id).filter((id) => checked[id] !== prevChecked.current[id]),
    );
    prevChecked.current = checked;
    if (changed.size === 0) return;
    setHighlighted(changed);
    const t = setTimeout(() => setHighlighted(new Set()), HIGHLIGHT_MS);
    return () => clearTimeout(t);
  }, [checked]);

  return (
    <div>
      <p className={styles.sectionTitle}>1. Observed traffic ({SAMPLE.length} requests)</p>
      <p className={styles.sectionHint}>
        Consider these {SAMPLE.length} requests as the raw L7 events captured
        between workloads in your cluster — one row per request, exactly as seen
        on the wire before any aggregation is applied. This is the input that the
        aggregation key collapses into log entries.
      </p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {RAW_COLUMNS.map((c) => (
                <th key={c.field} className={styles.header}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SAMPLE.map((row, i) => (
              <tr key={i}>
                {RAW_COLUMNS.map((c) => (
                  <td key={c.field} className={styles.cell}>{row[c.field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={styles.sectionTitle}>2. Aggregation key fields</p>
      <p className={styles.sectionHint}>
        Include or exclude each field from the aggregation key.
      </p>
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

      <p className={styles.sectionTitle}>3. Configuration</p>
      <p className={styles.sectionHint}>
        The <code>FelixConfiguration</code> produced by the selected fields.
      </p>
      <pre className={styles.code}>
        {STATIC_CONFIG.map((line) => (
          <div key={line} className={styles.codeLine}>{line}</div>
        ))}
        {AGGREGATORS.map((a) => (
          <div
            key={a.id}
            className={cx(styles.codeLine, highlighted.has(a.id) && styles.codeLineHi)}
          >
            {`  ${a.yaml}: ${checked[a.id] ? a.inc : a.exc}`}
          </div>
        ))}
      </pre>

      <p className={styles.sectionTitle}>
        4. Resulting log ({logEntries.length} {logEntries.length === 1 ? 'entry' : 'entries'})
      </p>
      <p className={styles.sectionHint}>
        What is written to the log file: one JSON entry per unique combination of
        the included fields, with <code>count</code> requests merged into it.
        Excluded fields collapse to <code>"-"</code>.
      </p>
      <pre className={styles.code}>{logText}</pre>
    </div>
  );
}
