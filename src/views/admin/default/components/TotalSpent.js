import React, { useState, useEffect } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

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

const bgButton = "d7a022";

export default function TotalSpent(props) {
  const { ...rest } = props;
  const [contentData, setContentData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        console.log("abenii", data)
        setContentData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");

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
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Text
            me="auto"
            color={textColor}
            fontSize="xl"
            fontWeight="700"
            lineHeight="100%"
          >
            Noties Board
          </Text>
          <Button
            ms="auto"
            align="center"
            justifyContent="center"
            bg={`#${bgButton}`}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w="37px"
            h="37px"
            lineHeight="100%"
            borderRadius="10px"
            onClick={handlePrevClick}
            {...rest}
          >
            <Icon as={IoArrowBack} color="#ffff" w="24px" h="24px" />
          </Button>
          <Button
            ms="auto"
            align="center"
            justifyContent="center"
            bg={`#${bgButton}`}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w="37px"
            h="37px"
            lineHeight="100%"
            borderRadius="10px"
            onClick={handleNextClick}
            {...rest}
          >
            <Icon as={IoArrowForward} color="#ffff" w="24px" h="24px" />
          </Button>
        </Flex>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
      <Box minH="260px" minW="75%" mt="3rem">
          {contentData.length > 0 ? (
            <Text me="auto" color={textColor} fontWeight="50" lineHeight="100%">
              
              {/* <Text>{contentData[currentIndex]?.body}</Text> */}
              <Text style={{  fontSize:"1rem", marginTop:'3rem', marginLeft:'0rem'}}>PurposeBlack is a brand new initiative launched in May 2020 by a group of more than 130 black experts. PurposeBlack, as the name suggests, aims to economically address some of the most pressing issues confronting Black people worldwide. </Text>
              <br />
              {/* <a href="#" style={{ fontWeight: "bold" }}>
                Read More
              </a> */}
            </Text>
          ) : (
            <Text>No data available.</Text>
          )}
        </Box>
      </Flex>
      <Button
        bg={`#${bgButton}`}
        fontSize="sm"
        fontWeight="500"
        color="#000"
        borderRadius="7px"
      >
        <Icon as={MdOutlineCalendarToday} color="#0000" me="4px" />
        PurposeBlack ETH
      </Button>
    </Card>
  );
}