import {
    Box,
    useColorModeValue,
  } from "@chakra-ui/react";


  import React from "react";
  import Tab from  "views/admin/Certeficate/components/Tab";
  import Tabs from "views/admin/Certeficate/components/Tabs";
  export default function UserReports() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
  
        <Tab />
      </Box>
    );
  }
  