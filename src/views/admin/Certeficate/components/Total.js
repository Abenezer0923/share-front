import React, { useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import {
  IoCheckmarkCircle,
  IoArrowBack,
  IoArrowForward,
} from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import contentData from "views/admin/default/variables/content.json";

export default function TotalSpent(props) {
  const { ...rest } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    if (currentIndex < contentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const percentage = 75;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
      {...rest}
    >
      <Flex
        justify="space-between"
        ps="0px"
        pe="20px"
        pt="5px"
        columns={{ base: 1, md: 2, lg: 3, xl: 2 }}
      >
        <Text
          me="auto"
          color={textColor}
          fontSize="2xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Total Amount of Share
        </Text>
      </Flex>
      <Flex
        w="100%"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "center", lg: "flex-start" }} // Center vertically on small screens, start on large screens
        mt={{ base: "2rem", lg: "5rem" }} // Adjust margin-top as needed
      >
        <Box
          minH="260px"
          minW={{ base: "100%", lg: "80%" }}
          mr={{ base: 0, lg: "2rem" }}
        >
          <Text
            color={textColor}
            fontWeight="bold"
            fontSize={{ base: "3xl", lg: "4xl" }}
            lineHeight="150%"
          >
            15,000
          </Text>
        </Box>
        
      </Flex>
   
    </Card>
  );
}
