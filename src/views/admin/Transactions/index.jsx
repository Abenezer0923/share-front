// Chakra imports
import { Box, SimpleGrid, Flex, Spinner } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/Transactions/components/DevelopmentTable";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/Transactions/variables/columnsData";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
        };

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/shareHolder/dashBoard`, { headers });

        const apiData = response.data.data;
        console.log("tr", apiData);
        const res = { obj: apiData.payment_history };
        const testing = { obj: apiData.payment_history };
        console.log("testing", testing);

        setData({
          resData: apiData,
          developmentTable: res.obj,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
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
  console.log("setData", data);
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
        justifyContent="center" // Center the content horizontally
        alignItems="center"
      >
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={data.developmentTable}
          resData={data.resData}
        />
      </SimpleGrid>
    </Box>
  );
}