import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [data, setData] = useState(null);

  const handleNextClick = () => {
    if (currentIndex < contentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
        };

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/shareHolder/dashBoard`, { headers });

        const apiData = response.data.data;
        console.log("apis", apiData)
        console.log("api total", apiData.shareCatagoryTotal)
        let lists = []
        for(let i = 0; i < (apiData.shareCatagoryTotal).length; i ++){
          lists.push(apiData.shareCatagoryTotal[i]._id)
        }
        let idxOfOrdinary = lists.indexOf('ordinary')
        let idxOfFranchis = lists.indexOf('franchise')
        let idxOfTsm = lists.indexOf('tsm')
        let valueOfTsm = 0
        let valueOfOrdinary = 0
        let valueOfFranchise = 0
        if (idxOfOrdinary !== -1){
          valueOfOrdinary = apiData.shareCatagoryTotal[idxOfOrdinary].total          
        }
        if( idxOfFranchis !== -1){
          valueOfFranchise = apiData.shareCatagoryTotal[idxOfFranchis].total
        }

        if (idxOfTsm !== -1){
          valueOfTsm = apiData.shareCatagoryTotal[idxOfTsm].total
        }
         
        
        console.log("Algo",lists)
        const res = { obj: apiData.payment_history.slice(0, 3) };
        const curr = {ans: apiData.completedShareInfo.slice(0,3)}
        console.log("currr", curr)
        
        const franchiseData = {
          
          name: "Franchise",
          growth: "buy",
          value: `${valueOfFranchise}`,
        };
        const ordinaryData = {
          name: "Ordinary",
          growth: "buy",
          value: `${valueOfOrdinary}`,
        };
        const tsmData = {
          name: "TSM",
          growth: "buy",
          value: `${valueOfTsm}`,
        };
        const totalData = {
          name: "Total",
          value:
            parseInt(franchiseData.value) +
            parseInt(ordinaryData.value) +
            parseInt(tsmData.value),
        };

        setData({
          franchiseData,
          ordinaryData,
          tsmData,
          totalData,
          checkTableData: res.obj,
          shareInfo: curr.ans
          
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [])

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
      w="50%"
      h='200px'
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
          
          color={textColor}
          fontSize="xl"
          fontWeight="100"
          lineHeight="100%"
        >
          Total Amount of <br /> Share
        </Text>
      </Flex>
      <Flex
        w="100%"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "center", lg: "flex-start" }} // Center vertically on small screens, start on large screens
        mt={{ base: "2rem", lg: "5rem" }} // Adjust margin-top as needed
      >
        {data ? (
        <Box
          minH="60px"
          minW={{ base: "100%", lg: "80%" }}
          mr={{ base: 0, lg: "2rem" }}
        >
          <Text
            color={textColor}
            fontWeight="bold"
            fontSize={{ base: "3xl", lg: "4xl" }}
            lineHeight="150%"
          >
            {data.ordinaryData.value}
          </Text>
        </Box>
      ) : (
        <Text>Loading data...</Text>
      )}
        
      </Flex>
   
    </Card>
  );
}
