import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  SimpleGrid,
  Flex,
  useColorModeValue,
  Spinner,
  Text,
} from "@chakra-ui/react";
import CheckTable from "views/admin/Franchise/components/CheckTable";
import { columnsDataDevelopment } from "views/admin/Franchise/variables/columnsData";
import tableDataDevelopment from "views/admin/Franchise/variables/tableDataDevelopment.json";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import { columnsHistoryCheck } from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/Franchise/variables/tableDataCheck.json";

import DevelopmentTable from "views/admin/Franchise/components/DevelopmentTable";
import Ordinary from "views/admin/Tsm/components/Ordinary";
import Total from "views/admin/Tsm/components/Total";
import Voice from "views/admin/Tsm/components/Voice";

export default function UserReports() {
  const [data, setData] = useState(null);
  const [rest, setRest] = useState(false);
  const [isnewPaymentPendingOrder, setIsnewPaymentPendingOrder] = useState(false);
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
        console.log("Heyy Abeniiiiii", apiData.shareHolderInfo._id)
        let newPaymentOrder = apiData.payment_Order;
        if(newPaymentOrder === null){
          newPaymentOrder = false

        }
        console.log("this is newPaymentOrder", newPaymentOrder)
        const isnewPaymentPending = newPaymentOrder.paymentStatus === "Pending" && newPaymentOrder.shareCatagory === "tsm";

        setIsnewPaymentPendingOrder(isnewPaymentPending);
        let lists = apiData.shareCatagoryTotal.map((item) => item._id);
        let idxOfOrdinary = lists.indexOf("ordinary");
        let idxOfFranchis = lists.indexOf("franchise");
        let idxOfTsm = lists.indexOf("tsm");
        let valueOfOrdinary = 0;
        let valueOfFranchise = 0;
        let valueOfTsm = 0

        if (idxOfOrdinary !== -1) {
          valueOfOrdinary = apiData.shareCatagoryTotal[idxOfOrdinary].total;
        }
        if (idxOfFranchis !== -1) {
          valueOfFranchise = apiData.shareCatagoryTotal[idxOfFranchis].total;
        }
        if(idxOfTsm !== -1) {
          valueOfTsm = apiData.shareCatagoryTotal[idxOfTsm].total;
        }

        const res = { obj: apiData.payment_history.slice(0, 3) };
        let currentShareInfo = null;
        if (apiData.currentShareInfo !== null) {
          currentShareInfo = apiData.currentShareInfo;
        }

        const shareHolderId = apiData.shareHolderInfo._id
        // console({shareHolderId})

        const curr = { ans: apiData.completedShareInfo.slice(0, 3) };
        let shareType = null;
        if (apiData.currentShareInfo !== null) {
          shareType = apiData.currentShareInfo.shareCatagory;
        }

        const tsmData = {
          name: "Tsm",
          growth: "buy",
          value: `${valueOfTsm}`,
        };

        setData({
          tsmData,
          developmentTable: res.obj,
          shareInfo: curr.ans,
          shareType,
          shareHolderId,
          currentShareInfo,
          // isnewPaymentPending,
        });

        if (shareType === "tsm" && !rest) {
          setRest(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!error.response) { // Network error
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  if (isLoading) {
    return (
      <Flex
        pt={{ base: "130px", md: "80px", xl: "80px" }}
        height="100vh"
        justify="center"
        align="center"
      >
        <Spinner
          color="teal.500"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          style={{ width: "4em", height: "4em" }}
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
  // console.log("this is the id", data.shareHolderId);
  console.log("index.js", isnewPaymentPendingOrder);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 2 }} gap="25px" mb="20px">
        {data && data.currentShareInfo !== null && rest && <Ordinary />}
        <Total />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <Box>
        {data && data.currentShareInfo === null && (
  <Voice shareHolderId={data.shareHolderId} isPending={isnewPaymentPendingOrder} />
)}

          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={data ? data.developmentTable : null}
          />
        </Box>
        <CheckTable
          columnsData={columnsHistoryCheck}
          tableData={data ? data.shareInfo : null}
          w="50%"
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        {/* Additional components */}
      </SimpleGrid>
    </Box>
  );
}
 


