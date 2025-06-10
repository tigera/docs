import React from 'react';
import { SimpleGrid, Box, Heading, Text, Flex, Image } from '@chakra-ui/react';

function CalicoProductBoxes() {
  const products = [
    {
      title: 'Calico Open Source',
      description: 'Open-source networking and security for containers and Kubernetes',
      imageSrc: '/img/about/logo-calico-open-source.png', // Path to your image in the static folder
      alt: 'Calico Open Source icon',
    },
    {
      title: 'Calico Cloud Free Tier',
      description: 'Observability & policy management for a single cluster',
      imageSrc: '/img/about/logo-calico-cloud-free.svg', // Path to your image
      alt: 'Calico Cloud Free Tier icon',
    },
    {
      title: 'Calico Cloud',
      description: 'SaaS platform for Kubernetes networking and security',
      imageSrc: '/img/about/logo-calico-cloud.png', // Path to your image
      alt: 'Calico Cloud icon',
    },
    {
      title: 'Calico Enterprise',
      description: 'Self-managed platform for Kubernetes networking and security',
      imageSrc: '/img/about/logo-calico-enterprise.svg', // Path to your image
      alt: 'Calico Enterprise icon',
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} my={8}>
      {products.map((product, index) => (
        <Box
          key={index}
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.2s ease-in-out"
          display="flex"
          flexDirection="column"
          alignItems="flex-start" // Align content to the start
          justifyContent="space-between"
          textAlign="left" // Ensure text is left-aligned within the box
        >
          {/* Image at the top */}
          <Image
            src={product.imageSrc}
            alt={product.alt}
            boxSize="80px" // Adjust size as needed
            mb={4} // Margin below the image
          />

          <Heading as="h5" size="md" fontWeight="bold" mb={2}>
            {product.title}
          </Heading>
          <Text fontSize="md" color="gray.600">
            {product.description}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default CalicoProductBoxes;