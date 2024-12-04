import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import styles from './styles.module.css';

const getSanitizedData = ({ fieldData }) => ({
  sanitizedDescription: { __html: DOMPurify.sanitize(fieldData.DescriptionHTML) },
  sanitizedSchema: { __html: DOMPurify.sanitize(fieldData.StringSchemaHTML) },
});

const TableConfig = ({ fieldData }) => {
  const { sanitizedDescription, sanitizedSchema } = getSanitizedData({ fieldData });

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
            <code>{fieldData.NameConfigFile || 'No Default Value'}</code>
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
          <td>
            {fieldData.StringDefault === '' ? (
              'none'
            ) : fieldData.GoType === '*v1.Duration' ? (
              <>
                <code>{fieldData.StringDefault}</code> ({fieldData.ParsedDefault})
              </>
            ) : (
              <code>{fieldData.StringDefault}</code>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableConfig;
