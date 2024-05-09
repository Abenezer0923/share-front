import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const CancelPage = () => {
  return (
    <Box textAlign="center" mt="20">
      <Heading color="gray.500" mb="4">Payment Cancelled</Heading>
      <Text fontSize="xl" mb="8">Your payment has been cancelled.</Text>
      <Button colorScheme="blue" onClick={() => { /* Redirect to home page or any other page */ }}>Go Back</Button>
    </Box>
  );
};

export default CancelPage;
