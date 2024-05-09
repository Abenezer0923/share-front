import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Box textAlign="center" mt="20">
      <Heading color="red.500" mb="4">Payment Error!</Heading>
      <Text fontSize="xl" mb="8">Sorry, there was an error processing your payment.</Text>
  
    </Box>
  );
};

export default ErrorPage;
