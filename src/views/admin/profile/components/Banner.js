import { Avatar, Box, Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Banner(props) {
  const { banner, avatar, name, job } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const textColorBold = useColorModeValue("secondaryGray.700", "gray.300");
  const borderColor = useColorModeValue("white !important", "#111C44 !important");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `${token}` };
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/shareHolder/dashBoard`, { headers });
        const apiData = response.data.data;

        const franchiseData = { name: "Franchise", growth: "buy", value: apiData.completedShareInfo[1]?.numberOfShare || "0" };
        const ordinaryData = { name: "Ordinary", growth: "buy", value: apiData.completedShareInfo[0]?.numberOfShare || "0" };
        const tsmData = { name: "TSM", growth: "buy", value: apiData.completedShareInfo[2]?.numberOfShare || "0" };
        const totalData = { name: "Total", value: parseInt(franchiseData.value) + parseInt(ordinaryData.value) + parseInt(tsmData.value) };

        setData({ franchiseData, ordinaryData, tsmData, totalData, info: apiData.shareHolderInfo });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return null; // Render loading state or return null
  }

  return (
    <Flex justify="center" align="center" minHeight="100vh">
      <Card p="16px" mb={{ base: "20px", lg: "20px" }} align="center" maxW="350px">
        <Box bg={`url(${banner})`} bgSize="cover" borderRadius="16px" h="200px" w="100%" />
        {/* <Avatar mx="auto" src={avatar} h="87px" w="87px" mt="-43px" border="4px solid" borderColor={borderColor} /> */}
        <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">{name}</Text>
        <Text color={textColorSecondary} fontSize="sm">{job}</Text>
        <Flex w="100%" mx="auto" mt="26px" direction="column">
          <Flex mx="auto" align="center">
            <Text color={textColorBold} fontSize="xl" fontWeight="bold">Email</Text>
            <Text color={textColorSecondary} fontSize="sm" fontWeight="bold" ml="1rem">{data.info.email}</Text>
          </Flex>
          <Flex mx="auto" mt="1rem" align="center">
            <Text color={textColorBold} fontSize="xl" mr="8rem" fontWeight="bold">Phone</Text>
            <Text color={textColorSecondary} fontSize="sm" fontWeight="bold" ml="0.5rem">{data.info.phone}</Text>
          </Flex>
          <Flex mx="auto" mt="1rem" align="center">
            <Text color={textColorBold} fontSize="xl" fontWeight="bold" mr="9.5rem">Address</Text>
            <Text color={textColorSecondary} fontSize="sm" fontWeight="bold" ml="0.5rem">{data.info.address}</Text>
          </Flex>
        </Flex>
        <Link to="/auth/updatePassword">
          <Button colorScheme="blue" mt="1rem">Update Password</Button>
        </Link>
      </Card>
    </Flex>
  );
}
