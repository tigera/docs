import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import styles from './styles.module.css';

const getSanitizedData = ({ fieldData }) => ({
  sanitizedNAMEYAML: { __html: DOMPurify.sanitize(fieldData.NameYAML) },
  sanitizedDescription: { __html: DOMPurify.sanitize(fieldData.DescriptionHTML) },
  sanitizedSchema: { __html: DOMPurify.sanitize(fieldData.YAMLSchemaHTML) },
});

const TableResource = ({ fieldData }) => {
  const { sanitizedNAMEYAML, sanitizedDescription, sanitizedSchema } = getSanitizedData({ fieldData });

  return (
    <table className={styles.felixTable}>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Key</td>
          <td>
            <code dangerouslySetInnerHTML={sanitizedNAMEYAML} />
          </td>
        </tr>
        <tr>
          <td>Description</td>
          <td dangerouslySetInnerHTML={sanitizedDescription} />
        </tr>
        <tr>
          <td>Schema</td>
          <td dangerouslySetInnerHTML={sanitizedSchema} />
        </tr>
        <tr>
          <td>Default</td>
          <td>{fieldData.YAMLDefault === '' ? 'none' : <code>{fieldData.YAMLDefault}</code>}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableResource;
