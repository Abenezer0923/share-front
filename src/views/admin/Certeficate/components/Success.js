import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const SuccessPage = () => {
  return (
    <Box textAlign="center" mt="20">
      <Heading color="green.500" mb="4">Payment Successful!</Heading>
      <Text fontSize="xl" mb="8">Thank you for your payment.</Text>
      <Button colorScheme="blue" onClick={() => { /* Redirect to home page or any other page */ }}>Continue Shopping</Button>
    </Box>
  );
};

export default SuccessPage;
