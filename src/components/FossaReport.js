import React from 'react';

export default function FossaReport({ version }) {
  const src = `/calico-enterprise/fossa-reports/${version}/attribution-report.html`;
  return (
    <iframe
      src={src}
      title={`FOSSA Attribution Report - ${version}`}
      sandbox=""
      referrerPolicy="no-referrer"
      style={{
        width: '100%',
        height: '80vh',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '4px',
      }}
    />
  );
}
