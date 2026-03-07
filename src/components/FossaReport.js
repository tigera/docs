import React from 'react';

function getMinorVersion(title) {
  const parts = title.replace(/^v/, '').split('.');
  return `${parts[0]}.${parts[1]}`;
}

export default function FossaReport({ releases }) {
  const latest = releases.find((r) => r.title !== 'master');
  if (!latest) {
    return <p>No FOSSA attribution report available for this version.</p>;
  }

  const minor = getMinorVersion(latest.title);
  const s3Key = minor.replace(/\./g, '-');
  const src = `/calico-enterprise/fossa-reports/${s3Key}/attribution-report.html`;

  return (
    <div>
      <iframe
        key={s3Key}
        src={src}
        title={`FOSSA Attribution Report - Calico Enterprise ${minor}`}
        sandbox=""
        style={{
          width: '100%',
          height: '80vh',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: '4px',
        }}
      />
      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
        <a href={src} target="_blank" rel="noopener noreferrer">
          Open report in new tab
        </a>
      </p>
    </div>
  );
}
