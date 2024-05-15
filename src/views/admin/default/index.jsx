import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  Spinner,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState, useEffect } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import YoutubeComplaxes from "views/admin/default/components/YoutubePu";
import ComplexTable from "views/admin/default/components/ComplexTable";
import History from "views/admin/default/components/History";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import {
  columnsDataCheck,
  columnsHistoryCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import tableHistory from "views/admin/default/variables/tableHistory.json";
import useFetch from "hooks/fetch.hook";
import axios from "axios";
import create from "zustand";

const UserReports = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
        };

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/shareHolder/dashBoard`, { headers });


        const apiData = response.data.data;
        console.log("apis", apiData);
        console.log("api total", apiData.shareCatagoryTotal);
        let lists = [];
        for (let i = 0; i < apiData.shareCatagoryTotal.length; i++) {
          lists.push(apiData.shareCatagoryTotal[i]._id);
        }
        let idxOfOrdinary = lists.indexOf("ordinary");
        let idxOfFranchis = lists.indexOf("franchise");
        let idxOfTsm = lists.indexOf("tsm");
        let valueOfTsm = 0;
        let valueOfOrdinary = 0;
        let valueOfFranchise = 0;
        if (idxOfOrdinary !== -1) {
          valueOfOrdinary = apiData.shareCatagoryTotal[idxOfOrdinary].total;
        }
        if (idxOfFranchis !== -1) {
          valueOfFranchise = apiData.shareCatagoryTotal[idxOfFranchis].total;
        }

        if (idxOfTsm !== -1) {
          valueOfTsm = apiData.shareCatagoryTotal[idxOfTsm].total;
        }

        console.log("Algo", lists);
        const res = { obj: apiData.payment_history.slice(0, 3) };
        const curr = { ans: apiData.completedShareInfo.slice(0, 3) };
        console.log("currr", curr);

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
          shareInfo: curr.ans,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!error.response) { // Network error
          setIsError(true);
        }
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once

  if (isLoading) {
    // Render loading spinner
    return (
      <Flex
        pt={{ base: "130px", md: "80px", xl: "80px" }}
        height="100vh"
        justify="center"
        align="center"
      >
        <Spinner
          color="teal.500"
          thickness="4px" // Adjust thickness as needed
          speed="0.65s" // Adjust speed as needed
          emptyColor="gray.200" // Adjust empty color as needed
          style={{ width: "4em", height: "4em" }} // Adjust width and height for larger size
        />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex
        pt={{ base: "130px", md: "80px", xl: "80px" }}
        height="100vh"
        justify="center"
        align="center"
      >
        <Text fontSize="xl" color="red.500">
          There is no internet connection. Please check your network and try again.
        </Text>
      </Flex>
    );
  }
  console.log("What", data.shareInfo);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        gap="25px"
        mb="20px"
      >
        <MiniStatistics {...data.franchiseData} />
        <MiniStatistics {...data.ordinaryData} />
        <MiniStatistics {...data.tsmData} />
        <MiniStatistics {...data.totalData} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        {/* <WeeklyRevenue /> */}
        {/* <CheckTable
          columnsData={columnsDataCheck}
          tableData={data.checkTableData}
        /> */}
         <YoutubeComplaxes
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
       
        <History columnsData={columnsHistoryCheck} tableData={data.shareInfo} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px">
          
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
};

export default UserReports;
