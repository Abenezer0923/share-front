
import { Box, Grid, Flex, Spinner, Text } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";
import bg_1 from "assets/img/bg_1.jpg";
import axios from "axios";
import React, { useState, useEffect } from "react";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";


export default function Overview() {
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
        console.log("apis", apiData)
        const res = { obj: apiData.payment_history.slice(0, 3) };
        const curr = {ans: apiData.completedShareInfo.slice(0,3)}
        const info = apiData.shareHolderInfo

        console.log("currr", curr)
        
        const franchiseData = {
          name: "Franchise",
          growth: "buy",
          value: apiData.completedShareInfo[1]?.numberOfShare || "0",
        };
        const ordinaryData = {
          name: "Ordinary",
          growth: "buy",
          value: apiData.completedShareInfo[0]?.numberOfShare || "0",
        };
        const tsmData = {
          name: "TSM",
          growth: "buy",
          value: apiData.completedShareInfo[2]?.numberOfShare || "0",
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
          info
          
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!error.response) { // Network error
          setIsError(true);
        }
      }finally {
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
  console.log("name", data.info.first_name )
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        <Grid
          templateColumns={{
            base: "1fr",
          
          }}
          templateRows={{
            base: "repeat(3, 1fr)",
          
          }}
         
        >
        <Banner
          banner={bg_1}
          avatar={avatar}
          name={data.info.first_name}
          job='ShearHolder'
          posts='17'
        />
      </Grid>
    </Box>
  );
}
