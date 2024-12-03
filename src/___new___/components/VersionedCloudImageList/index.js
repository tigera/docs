import React, { useState } from 'react';
import { Select, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import CodeBlock from '@theme/CodeBlock';
import variables from '../../../../calico-cloud/variables';
import ccImageLists from '../../data/ccImageLists';

const CodeBlockSelector = () => {
  const [selectedVersion, setSelectedVersion] = useState(Object.keys(ccImageLists)[0]);

  const handleSelectChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  return (
    <Flex
      gap={4}
      flexDir='column'
    >
      <FormControl>
        <FormLabel>
          <Text
            as='h3'
            fontSize='sm'
          >
            Select your version:
          </Text>
        </FormLabel>
        <Select
          width='20%'
          value={selectedVersion}
          onChange={handleSelectChange}
        >
          {Object.keys(ccImageLists).map((version) => (
            <option
              key={version}
              value={version}
            >
              {version}
            </option>
          ))}
        </Select>
      </FormControl>
      <CodeBlock
        title={`Helm command to add images for Calico Cloud ${selectedVersion}`}
        language='javascript'
      >
        {`helm repo add calico-cloud ${variables.clouddownloadbase}/charts
INSTALLER_IMAGE="${variables.cloudoperatorimage}:$(helm show chart calico-cloud/calico-cloud | grep version: | sed -e 's/version: *//' -e 's/+/-g/')"
IMAGES=(
$INSTALLER_IMAGE
${ccImageLists[selectedVersion]}
)`}
      </CodeBlock>
    </Flex>
  );
};

export default CodeBlockSelector;
