import {
  ChakraProvider,
  Box,
  Tabs,
  TabList,
  Tab,
  SimpleGrid,
  TabPanel,
  TabPanels,
  Flex,
  Spinner,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";

import React, { useState, useEffect }  from "react";
import Card from "components/card/Card"; // Import your custom Card component
import cc2 from "assets/img/CC2.jpg";
import { Link } from 'react-router-dom';
import routes from "routes";
import axios from "axios";
import Templete from "views/admin/Templete";



function MyTabs() {
  const [fixed] = useState(false);
  const [data, setData] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [dynamicRoutes, setDynamicRoutes] = useState(routes);
  const [ress, SetRess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
        };

        const response = await axios.get(
          "http://localhost:2024/api/shareHolder/dashBoard",
          { headers }
        );

        const apiData = response.data.data;
        console.log("Heyy Abeniiiiii", apiData.shareHolderInfo._id)
        let newPaymentOrder = apiData.newPayment_Order;
        if(newPaymentOrder === null){
          newPaymentOrder = false

        }
        console.log("this is newPaymentOrder", newPaymentOrder)
        const isnewPaymentPending = newPaymentOrder.paymentStatus === "Pending" && newPaymentOrder.shareCatagory === "ordinary";

      
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

  const addDynamicRoute = () => {
    // Check if the route is already added
    const templeteRouteExists = dynamicRoutes.some((route) => route.path === '/Templete');

    if (!templeteRouteExists) {
      // Add the dynamic route
      const newDynamicRoutes = [...dynamicRoutes, {
        layout: '/admin',
        path: '/Templete',
        component: Templete,
        hidden: true,
      }];

      setDynamicRoutes(newDynamicRoutes);
    }
  };
  return (
    false ? (<Box
      mt="12rem"
      fontSize="xxx-large"
      bg="#d7a022"
      borderRadius="xl"
      boxShadow="lg"
      p="6"
      textAlign="center"
      color="white"
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      coming soon....
    </Box>) : (<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
              <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
                {/* Card 1 */}
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>

                {/* Card 2 */}
                {/* Add similar cards with different images */}
              </SimpleGrid>
            </TabPanel>
            {/* Add content for other tabs as needed */}
            <TabPanel>
              <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              
              <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        onClick={addDynamicRoute}
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  </Box>)
  );
}

export default MyTabs;
