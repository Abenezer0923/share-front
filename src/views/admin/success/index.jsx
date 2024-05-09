import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const SuccessPage = () => {
  return (
    <Box textAlign="center" mt="20">
      <Heading color="green.500" mb="4">Payment Successful!</Heading>
      <Text fontSize="xl" mb="8">Thank you for your payment.</Text>
    </Box>
  );
};

export default SuccessPage;
