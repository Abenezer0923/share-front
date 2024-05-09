import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons"; // Import email icon from Chakra UI

import purposeBlackLogo from "../../../components/icons/purposeblackethiopia.png"; // Import your logo here

const PasswordResetMessage = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Image src={purposeBlackLogo} alt="Purpose Black Ethiopia Logo" mb="2" maxW="300px" /> {/* Adjust max width as needed */}
      <Text fontSize="xl" fontWeight="bold" mb="4" textAlign="center">
        Dear Shareholder,
      </Text>
      <Text fontSize="lg" textAlign="center" mb="4">
        Kindly note that we have sent a password reset link to your email <EmailIcon mx="1" /> for your convenience.
        Please check your inbox at your earliest convenience.
      </Text>
      <Text fontSize="lg" textAlign="center">Thank you.</Text>
    </Flex>
  );
};

export default PasswordResetMessage;
