/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  ChakraProvider,
  Avatar,
  Box,
  Flex,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
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

export default function Tabs() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ChakraProvider>
        <Box p={4}>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>All</Tab>
              <Tab>Franchise</Tab>
              <Tab>Ordinary</Tab>
              <Tab>TSM</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>Hiiiii</p>
              </TabPanel>
              <TabPanel>
                <p>Content for Tab 2</p>
              </TabPanel>
              <TabPanel>
                <p>Content for Tab 3</p>
              </TabPanel>
              <TabPanel>
                <p>Hi</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </ChakraProvider>
    </Box>
  );
}
