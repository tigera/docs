import React from 'react';
import { CE_VERSIONS, platforms } from '../../data/platformMatrixData';

function renderCell(platform, version) {
  const entry = platform.data[version];
  if (!entry) {
    return '—';
  }

  switch (platform.displayType) {
    case 'k8s-range':
      return entry.k8sVersions;
    case 'platform-and-k8s':
      return (
        <>
          {entry.platformVersion}
          <br />
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>k8s {entry.k8sVersions}</span>
        </>
      );
    case 'platform-only':
      return entry.platformVersion;
    default:
      return '—';
  }
}

export default function PlatformMatrix() {
  const footnotes = platforms.filter((p) => p.footnote);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            {CE_VERSIONS.map((v) => (
              <th key={v}>CE {v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {platforms.map((platform) => (
            <tr key={platform.id}>
              <td>
                <strong>{platform.label}</strong>
                {platform.footnote && <sup>*</sup>}
              </td>
              {CE_VERSIONS.map((v) => (
                <td key={v}>{renderCell(platform, v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {footnotes.length > 0 && (
        <p style={{ fontSize: '0.9em' }}>
          {footnotes.map((p) => (
            <span key={p.id}>
              * {p.footnote}
              <br />
            </span>
          ))}
        </p>
      )}
    </>
  );
}
