import {
  Avatar,
  Box,
  Flex,
  Spinner,
  FormLabel,
  Icon,
  Text,
  Select,
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
import axios from "axios";

import CheckTable from "views/admin/Franchise/components/CheckTable";
import TotalSpent from "views/admin/Franchise/components/TotalSpent";
import WeeklyRevenue from "views/admin/Franchise/components/WeeklyRevenue";
import { columnsDataDevelopment } from "views/admin/Franchise/variables/columnsData";
import tableDataDevelopment from "views/admin/Franchise/variables/tableDataDevelopment.json";

import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import { columnsHistoryCheck } from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/Franchise/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import tableHistory from "views/admin/default/variables/tableHistory.json";
import DevelopmentTable from "views/admin/Ordinary/components/DevelopmentTable";
import Ordinary from "views/admin/Ordinary/components/Ordinary";
import Total from "views/admin/Ordinary/components/Total";
import Voice from "views/admin/Ordinary/components/Voice";

export default function UserReports() {
  const [data, setData] = useState(null);
  const [rest, setRest] = useState(false);
  const [isnewPaymentPendingOrder, setIsnewPaymentPendingOrder] = useState(false);
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
        console.log("Heyy Abeniiiiii", apiData.shareHolderInfo._id)
        let newPaymentOrder = apiData.payment_Order;
        if(newPaymentOrder === null){
          newPaymentOrder = false

        }
        console.log("this is newPaymentOrder", newPaymentOrder)
        const isnewPaymentPending = newPaymentOrder.paymentStatus === "Pending" && newPaymentOrder.shareCatagory === "ordinary";

        setIsnewPaymentPendingOrder(isnewPaymentPending);
        let lists = apiData.shareCatagoryTotal.map((item) => item._id);
        let idxOfOrdinary = lists.indexOf("ordinary");
        let idxOfFranchis = lists.indexOf("franchise");
        let idxOfTsm = lists.indexOf("tsm");
        let valueOfOrdinary = 0;
        let valueOfFranchise = 0;

        if (idxOfOrdinary !== -1) {
          valueOfOrdinary = apiData.shareCatagoryTotal[idxOfOrdinary].total;
        }
        if (idxOfFranchis !== -1) {
          valueOfFranchise = apiData.shareCatagoryTotal[idxOfFranchis].total;
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

        const ordinaryData = {
          name: "Ordinary",
          growth: "buy",
          value: `${valueOfOrdinary}`,
        };

        setData({
          ordinaryData,
          developmentTable: res.obj,
          shareInfo: curr.ans,
          shareType,
          shareHolderId,
          currentShareInfo,
          // isnewPaymentPending,
        });

        if (shareType === "ordinary" && !rest) {
          setRest(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
