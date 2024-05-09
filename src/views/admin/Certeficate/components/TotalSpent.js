import React, { useState } from "react";

// Chakra imports
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  List,
  ListItem,
  Button,
  Flex,
  useDisclosure,
  Text,
  useColorModeValue,
  VStack,
  Checkbox,
  Radio,
  Input,
  Link,
  Image,
} from "@chakra-ui/react";
import p1 from "assets/img/Untitled-removebg-preview.png";
import p2 from "assets/img/tele.png";
import p3 from "assets/img/Paypal.png";
import p4 from "assets/img/visa.jpeg";

// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import {
  IoCheckmarkCircle,
  IoArrowBack,
  IoArrowForward,
  IoAdd,
} from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";

import { HSeparator } from "components/separator/Separator.jsx";

import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import contentData from "views/admin/default/variables/content.json";

export default function TotalSpent(props) {
  const { ...rest } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("ORDINARY SHARE");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setButtonLabel(option);
    // Additional logic or data fetching based on the selected option
  };
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const renderModalContent = () => {
    switch (selectedOption) {
      case "FRANCHISE SHARE":
        return (
          <VStack align="start" spacing={4} p={1} m={1} overflowY="auto">
            <Box h="350px">
              <Text mb={4}>
                <Checkbox
                  isChecked={checkboxChecked}
                  onChange={handleCheckboxChange}
                />
                <strong>Type 1: G +1 (Shop + Cafe)</strong>
              </Text>
              <Text ml={6} mb={2}>
                Starting Price: $6,000,000 - Starting price may vary by location
                and time
              </Text>
              {/* Conditionally render input placeholders when the checkbox is checked */}
              {checkboxChecked && (
                <>
                  <>
                    <Input
                      ml={6}
                      mb={2}
                      placeholder="Number of Type 1 Shop you want to buy"
                    />
                    <Input
                      ml={6}
                      mb={2}
                      placeholder="Which advertised location do you want to purchase"
                    />
                    <Input ml={6} mb={2} placeholder="Input Placeholder 3" />
                  </>
                  <Box>
                  <Text ml={6} mb={2}>
                  Will vou pavina 100% of the franchise fee unfront?!
              </Text>
                  </Box>
                  <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
                    <Radio ml={6} mb={2} onChange={() => {}}>
                      Yes
                    </Radio>
                    <Radio mb={2} onChange={() => {}}>
                      No
                    </Radio>
                  </Flex>
                </>
              )}
              <Text mb={4}>
                <Checkbox/>
                <strong>Type 2: Single Level (Shop Only)</strong>
              </Text>
              <Text ml={6} mb={2}>
                Starting Price: $4,000,000 - Starting price may vary by location
                and time
              </Text>
              <Text ml={6} mb={2} fontWeight="bold">
                NB:
              </Text>

              <Text ml={6} mb={2}>
                • This document is the property of PurposeBlack, and
                unauthorized use or distribution is strictly prohibited.
              </Text>
              <Text ml={6} mb={2}>
                • This application form is used for the sole purpose of
                PurposeBlack Franchise sale.
              </Text>
              <Text ml={6} mb={2}>
                • This form is just an application to purchase a PurposeBlack
                franchise and does not guarantee that the application will be
                accepted.
              </Text>
              <Text ml={6} mb={2}>
                • This is the first step of the franchise purchase process, and
                if the application is accepted, franchisees will be required to
                complete a franchise agreement and complete payment before the
                share and franchise certificates are sent to them.
              </Text>
              <Flex justify="space-between" ml='50px' w='400px'>
                {/* Option 1 */}
                <Link href="#" _hover={{ textDecor: "none" }}>
                  <Text>
                    <Checkbox />
                    <strong>25%</strong>
                  </Text>
                </Link>

                {/* Option 2 */}
                <Link href="#" _hover={{ textDecor: "none" }}>
                  <Text mb={1}>
                    <Checkbox />
                    <strong>50%</strong>
                  </Text>
                </Link>

                {/* Option 3 */}
                <Link href="" _hover={{ textDecor: "none" }}>
                  <Text mb={1}>
                    <Checkbox />
                    <strong>75%</strong>
                  </Text>
                </Link>

                {/* Option 4 */}
                <Link href="" _hover={{ textDecor: "none" }}>
                  <Text mb={1}>
                    <Checkbox />
                    <strong>100%</strong>
                  </Text>
                </Link>
              </Flex>

              <Flex justify="space-between" p={4}>
                {/* Image 1 */}
                <Link href="" _hover={{ textDecor: "none" }}>
                  <Box
                    as="img"
                    src={p1}
                    alt="Image 1"
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                    cursor="pointer"
                  />
                </Link>

                {/* Image 2 */}
                <Link href="#" _hover={{ textDecor: "none" }}>
                  <Box
                    as="img"
                    src={p2}
                    alt="Image 2"
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                    cursor="pointer"
                  />
                </Link>

                {/* Image 3 */}
                <Link href="#" _hover={{ textDecor: "none" }}>
                  <Box
                    as="img"
                    src={p3}
                    alt="Image 3"
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                    cursor="pointer"
                  />
                </Link>

                {/* Image 4 */}
                <Link
                  href="/path/to/image4-link"
                  _hover={{ textDecor: "none" }}
                >
                  <Box
                    as="img"
                    src={p4}
                    alt="Image 4"
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                    cursor="pointer"
                  />
                </Link>
              </Flex>
              <Button
                bg={boxBg}
                w="450px"
                ml="60px"
                mb="25px"
                fontSize="sm"
                fontWeight="600"
                color={textColorSecondary}
                borderRadius="7px"
              >
                Pay
              </Button>
            </Box>
          </VStack>
        );
   
      default:
        return null;
    }
  };

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
      w="100%"
     
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
            Additional Investment
          </Text>

          <Button
            ms="auto"
            align="center"
            justifyContent="center"
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w="100px"
            h="37px"
            lineHeight="100%"
            onClick={onOpen}
            borderRadius="10px"
            {...rest}
          >
            <Text
              me="auto"
              color={textColor}
              fontSize="xl"
              fontWeight="500"
              lineHeight="70%"
            >
              Add
            </Text>
            <Icon as={IoAdd} color={textColor} w="24px" h="24px" />
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={() => {
              onClose();
              setSelectedOption(null);
            }}
            isCentered
            size="xl"
            maxH="650px"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Type</ModalHeader>
              <ModalCloseButton />
              <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
                <ModalBody>
                  <Popover>
                    <PopoverTrigger>
                      <Button rightIcon={<Icon as={FiChevronDown} />}>
                        {buttonLabel}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Options</PopoverHeader>
                      <PopoverBody>
                        <List>
                          <ListItem
                            onClick={() => handleOptionClick("FRANCHISE SHARE")}
                          >
                            <Button>FRANCHISE SHARE</Button>
                          </ListItem>
                          <ListItem
                            onClick={() => handleOptionClick("TSM SHARE")}
                          >
                            <Button>TSM SHARE</Button>
                          </ListItem>
                          <ListItem
                            onClick={() => handleOptionClick("ORDINARY SHARE")}
                          >
                            <Button>ORDINARY SHARE</Button>
                          </ListItem>
                        </List>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </ModalBody>
                <HSeparator mt="30px" />
                <HSeparator mt="30px" ml="10px" />
              </Flex>
              {buttonLabel === "FRANCHISE SHARE" && renderModalContent()}
              {buttonLabel !== "FRANCHISE SHARE" && <><Flex justify="space-between" ml='50px' w='400px'>
                {/* Option 1 */}
                <Link href="#" _hover={{ textDecor: "none" }}>
                  <Text>
                    <Checkbox />
                    <strong>25%</strong>
                  </Text>
                </Link>

                {/* Option 2 */}
                <Link href="#" _hover={{ textDecor: "none" }}>
                  <Text mb={1}>
                    <Checkbox />
                    <strong>50%</strong>
                  </Text>
                </Link>

                {/* Option 3 */}
                <Link href="" _hover={{ textDecor: "none" }}>
                  <Text mb={1}>
                    <Checkbox />
                    <strong>75%</strong>
                  </Text>
                </Link>

                {/* Option 4 */}
                <Link href="" _hover={{ textDecor: "none" }}>
                  <Text mb={1}>
                    <Checkbox />
                    <strong>100%</strong>
                  </Text>
                </Link>
              </Flex><Flex justify="space-between" p={4}>
                  {/* Image 1 */}
                  <Link href="" _hover={{ textDecor: "none" }}>
                    <Box
                      as="img"
                      src={p1}
                      alt="Image 1"
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                      cursor="pointer" />
                  </Link>

                  {/* Image 2 */}
                  <Link href="#" _hover={{ textDecor: "none" }}>
                    <Box
                      as="img"
                      src={p2}
                      alt="Image 2"
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                      cursor="pointer" />
                  </Link>

                  {/* Image 3 */}
                  <Link href="#" _hover={{ textDecor: "none" }}>
                    <Box
                      as="img"
                      src={p3}
                      alt="Image 3"
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                      cursor="pointer" />
                  </Link>

                  {/* Image 4 */}
                  <Link
                    href="/path/to/image4-link"
                    _hover={{ textDecor: "none" }}
                  >
                    <Box
                      as="img"
                      src={p4}
                      alt="Image 4"
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                      cursor="pointer" />
                  </Link>
                </Flex><Button
                  bg={boxBg}
                  w="450px"
                  ml="60px"
                  mb="25px"
                  fontSize="sm"
                  fontWeight="600"
                  color={textColorSecondary}
                  borderRadius="7px"
                >
                  Pay
                </Button></>}
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </Card>
  );
}
