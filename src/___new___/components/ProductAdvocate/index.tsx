import * as React from 'react';
import { Card, CardBody, Image, Text, Heading, Box, Flex } from "@chakra-ui/react"
import { advocacyMessages, AdvocacyMessage } from './advocacyMessages';

interface ProductAdvocateProps {
  messageId?: string;
}



const ProductAdvocate: React.FC<ProductAdvocateProps> = ({ messageId, ...rest }) => {

  // Select message based on messageId or randomly if not provided
  const [selectedMessage] = React.useState(() => {
    if (messageId) {
      const targetedMessage = advocacyMessages.find(msg => msg.id === messageId);
      if (targetedMessage) {
        return targetedMessage;
      }
      // Fallback to random if messageId not found
      console.warn(`Message with ID "${messageId}" not found, falling back to random selection`);
    }
    
    const randomIndex = Math.floor(Math.random() * advocacyMessages.length);
    return advocacyMessages[randomIndex];
  });

  const handleCardClick = () => {
    window.open(selectedMessage.link, '_blank');
  };

  // Default gradient fallback
  const defaultGradient = "linear(to-r, blue.500, purple.600)";

  return (
    <Card 
      w="100%" 
      maxW="100%" 
      h={{ base: "auto", md: "150px" }}
      maxH="150px"
      overflow="hidden" 
      bgGradient={selectedMessage.bgGradient || defaultGradient}
      color="white"
      boxShadow="xl"
      borderRadius="lg"
      position="relative"
      _hover={{ transform: 'translateY(-2px)', boxShadow: '2xl', cursor: 'pointer' }}
      transition="all 0.3s ease"
      onClick={handleCardClick}
    >
      <Flex direction={{ base: "column", md: "row" }} align="center" h="100%">
        <CardBody flex="1" p={{ base: 4, md: 6 }} h="100%" display="flex" flexDirection="column" justifyContent="center">
          <Flex direction="column" h="100%" justify="space-between">
            <Box>
              <Heading _firstLetter={{ textTransform: "uppercase" }}
                size="md" 
                mb={2}
                bgGradient="linear(to-r, yellow.200, orange.200)"
                bgClip="text"
                fontWeight="bold"
                lineHeight="tight"
                noOfLines={1}
              >
                {selectedMessage.title}
              </Heading>
              
              <Text fontSize="sm" mb={3} opacity={0.9} lineHeight="tight" noOfLines={2}>
                {selectedMessage.description}
              </Text>
            </Box>
            
            <Box>
              <Text fontSize="xs" opacity={0.7} noOfLines={1}>
                {selectedMessage.socialProof}
              </Text>
            </Box>
          </Flex>
        </CardBody>
        
        <Box 
          flexShrink={0} 
          w={{ base: "100%", md: "200px" }}
          h={{ base: "120px", md: "150px" }}
          position="relative"
        >
          <Image
            src={selectedMessage.imageUrl}
            alt={selectedMessage.imageAlt}
            w="100%"
            h="100%"
            objectFit="cover"
            borderLeftRadius={{ base: "none", md: "lg" }}
            borderTopRadius={{ base: "lg", md: "none" }}
          />
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="blackAlpha.700"
            color="white"
            px={2}
            py={0.5}
            borderRadius="sm"
            fontSize="xs"
            fontWeight="bold"
          >
            {selectedMessage.overlayBadge}
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export default ProductAdvocate;
