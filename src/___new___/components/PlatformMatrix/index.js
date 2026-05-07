import React from 'react';
import Link from '@docusaurus/Link';
import {
  CE_VERSIONS,
  VISIBLE_COLUMN_COUNT,
  PLATFORMS,
  getEntries,
} from '../../data/platformMatrixData';

function Entry({ entry }) {
  const { platformVersion, k8sVersions } = entry;
  if (platformVersion && k8sVersions) {
    return (
      <>
        {platformVersion}
        <br />
        <span style={{ fontSize: '0.9em', opacity: 0.75 }}>k8s {k8sVersions}</span>
      </>
    );
  }
  return <>{platformVersion ?? k8sVersions ?? '—'}</>;
}

function Cell({ platform, version }) {
  const entries = getEntries(platform, version);
  if (entries.length === 0) return '—';
  return (
    <>
      {entries.map((e, i) => (
        <div key={i} style={{ marginTop: i === 0 ? 0 : '0.5em' }}>
          <Entry entry={e} />
        </div>
      ))}
    </>
  );
}

export default function PlatformMatrix() {
  const columns = CE_VERSIONS.slice(-VISIBLE_COLUMN_COUNT).reverse();
  const noted = PLATFORMS.filter((p) => p.notes);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            {columns.map((v) => (
              <th key={v}>CE {v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PLATFORMS.map((platform) => (
            <tr key={platform.id}>
              <td>
                {platform.installPath ? (
                  <Link to={platform.installPath}>
                    <strong>{platform.label}</strong>
                  </Link>
                ) : (
                  <strong>{platform.label}</strong>
                )}
                {platform.notes && <sup>*</sup>}
              </td>
              {columns.map((v) => (
                <td key={v}>
                  <Cell platform={platform} version={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {noted.length > 0 && (
        <p style={{ fontSize: '0.9em' }}>
          {noted.map((p) => (
            <span key={p.id}>
              * {p.notes}
              <br />
            </span>
          ))}
        </p>
      )}
    </>
  );
}
