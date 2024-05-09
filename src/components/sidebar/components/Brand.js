import React from "react";

// Chakra imports
import { Flex, Image, useColorModeValue } from "@chakra-ui/react";

// Custom components
import purposeBlackLogo from "components/icons/purposeblackethiopia.png";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Image src={purposeBlackLogo} alt="Purpose Black Ethiopia Logo"  my="0px" />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
