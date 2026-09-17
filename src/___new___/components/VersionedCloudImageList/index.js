import React, { useState } from 'react';
import { Select, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import CodeBlock from '@theme/CodeBlock';
import variables from '../../../../calico-cloud/variables';
import ccImageLists from '../../data/ccImageLists';

// cc-operator is released per Calico Cloud version and tagged with it, so the entry key is the
// operator tag. The newest entry is labelled "(latest)", which is not part of the tag.
const operatorTag = (version) => version.replace(/\s*\(latest\)$/, '');

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
        title={`Images for Calico Cloud ${selectedVersion}`}
        language='bash'
      >
        {`OPERATOR_IMAGE=${variables.cloudoperatorimage}:${operatorTag(selectedVersion)}
IMAGES=(
${ccImageLists[selectedVersion]}
)`}
      </CodeBlock>
    </Flex>
  );
};

export default CodeBlockSelector;
