import React, { useState, useEffect } from 'react';
import jsonData from './config-params.json';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TableResource from './TableResource';
import TableConfig from './TableConfig';
import TableEnv from './TableEnv';
import styles from './styles.module.css';

const FelixConfigTable = ({ configType, fieldData }) => {
  let table;

  switch (configType) {
    case 'yaml':
      table = <TableResource fieldData={fieldData} />;
      break;
    case 'config':
      table = <TableConfig fieldData={fieldData} />;
      break;
    case 'env':
      table = <TableEnv fieldData={fieldData} />;
      break;
    default:
      table = <p>Unknown config type</p>;
  }

  return <div>{table}</div>;
};

const FelixConfig = ({ configType, name }) => {
  const matchedGroup = jsonData.Groups.find((group) => group.Name === name);
  // Debugging logs

  if (!matchedGroup) {
    return <p>No matching group found for '{name}'.</p>;
  }

  let content;

  if (configType === 'yaml') {
    content = (
      <div>
        {matchedGroup.Fields.map((field, index) => (
          field.NameYAML ? (
            <div key={index}>
              <h5 id={field.NameYAML}>
                <code>{field.NameYAML}</code>
              </h5>
              <FelixConfigTable
                configType='yaml'
                fieldData={field}
              />
            </div>
          ) : null
        ))}
      </div>
    );
  } else if (configType === 'configenv') {
    content = (
      <div className={styles.tabsContainer}>
        {matchedGroup.Fields.map((field, index) => (
          <div key={field.NameCongigFile || index}>
            <h4 id={field.NameConfigFile}><code>{field.NameConfigFile}</code></h4>
            <Tabs
              groupId='operating-systems'
            >
              <TabItem
                value='config'
                label='Configuration file'
              >
              <FelixConfigTable
                configType='config'
                fieldData={field}
              />
            </TabItem>
            <TabItem
              value='env'
              label='Environment variable'
            >
              <FelixConfigTable
                configType='env'
                fieldData={field}
              />
            </TabItem>
          </Tabs>
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div>
        <p>You got it wrong</p>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default FelixConfig;
