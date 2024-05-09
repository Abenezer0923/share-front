import React, { useState, useEffect } from "react";

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
  RadioGroup,
  FormControl,
  Input,
  Link,
  Image,
} from "@chakra-ui/react";
import p1 from "assets/img/Untitled-removebg-preview.png";
import p2 from "assets/img/tele.png";
import p3 from "assets/img/Paypal.png";
import p4 from "assets/img/visa.jpeg";
import { HSeparator } from "components/separator/Separator.jsx";

// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import { FiChevronDown } from "react-icons/fi";
import {
  IoCheckmarkCircle,
  IoArrowBack,
  IoArrowForward,
  IoAdd,
} from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";

import {
  FiChevronRight,
  FiUpload,
  FiCheckCircle,
  FiXCircle,
  FiCamera,
} from "react-icons/fi";
// Assets
import contentData from "views/admin/default/variables/content.json";
import axios from "axios";
export default function TotalSpent(props) {
  const { isPending, shareHolderId, ...rest } = props;
  console.log("thisss",shareHolderId)
  console.log("this is pending", isPending);
  // console.log("is pendddding", isPending);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState("");
  const [updatePending, setUpdatePending] = useState(isPending)
  const [isExpanded, setIsExpanded] = useState(false);
  const [popoverHeaders, setPopoverHeader] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedPercentage, setSelectedPercentage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  // const [shareHolderId, setShareHolderId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [isPaymentPendings, setIsPaymentPending] = useState(false);
  const [buttonPersent, setButtonPersent] = useState("");
  const [buttonLabel, setButtonLabel] = useState("ORDINARY SHARE");
  const [paymentMethod, setPaymentMethod] = useState("bankTransfer");
  const [restShare, setRestShare] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [shareAmount, setShareAmount] = useState("");
  const [calculatedAmount, setCalculatedAmount] = useState(null);
  const [numberOfShare, setNumberOfShare] = useState("")

  const [total, setTotal] = useState(null);
  const [dynamicOptions, setDynamicOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const [data, setData] = useState(null);

  const handlePercentageSelection = (percentage, amount) => {
    const Totalres = amount * 100;
    const res = ((percentage / 100) * Totalres) + (0.05 * Totalres);
    setCalculatedAmount(res);
  };
  const numberOfShareHandleer = (event) => {
    setNumberOfShare(event.target.value)
  }
  const handleAccountNumberChange = (event) => {
    console.log("the Acc num is", event.target.value);
    setAccountNumber(event.target.value);
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };





  const handleOptionClick = (option) => {
    setPopoverHeader(option);
  };
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);

    setQuantity(value);
  };


  const handlePayButtonClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("acc_No", accountNumber);
      formData.append("numberOfShare", quantity)
      formData.append("percentage", buttonPersent);
      formData.append("amount_birr", calculatedAmount);
      formData.append("image", selectedFile);
      formData.append("paymentMethod", popoverHeaders);
      // formData.append("payment_id", paymentId);
      formData.append("shareHolder_id", shareHolderId);
      formData.append("paymentStatus", "Pending");
      formData.append("shareCatagory", "ordinary");
      formData.append("shareType", "ordinary")

      const responseFromBack = await axios.post(
        "http://localhost:2024/api/orderPayment/bankPayment",
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from backend:", responseFromBack.data);
      // setpaymentOrderStatus("Pending");
      setUpdatePending(true)
      
    } catch (error) {
      console.error("Error while sending data:", error);
    }
  };


  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    const config = {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadProgress(progress);
      },
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:2024/api/orderPayment/bankPayment",
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
          ...config,
        }
      );
      console.log("Upload successful:", response.data);
      console.log("to see the image", response.data);
      // setUploadedImage(response.data.imageUrl);
      // setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < contentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  // Update the calculateTotal function to accept the selected percentage as an argument
  // Update the calculateTotal function to accept the selected percentage as an argument
  const calculateTotal = (selectedPercentage) => {
    if (!selectedPercentage || isNaN(quantity)) {
      return 0;
    }

    const percentage = parseFloat(selectedPercentage);
    const total = (percentage / 100) * (quantity * 100);
    setResult(total); // Set the result state with the exact value
    return total;
  };

  const handleCalculateButtonClick = (selectedPercentage) => {
    const total = calculateTotal(selectedPercentage);
    setTotal(total);
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Chakra Color Mode

  useEffect(() => {
    const options = [];
    for (let i = 25; i <= 100; i += 25) {
      options.push({ value: i, label: `${i}%`, amount: quantity });
    }
    setDynamicOptions(options);
  }, [quantity]);
  

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      {...rest}
    >
      {updatePending ? (
        <Text color="#d7a022" fontSize="2xl">
          The Payment is Pending...
        </Text>
      ) : (
        <>
          <Flex>
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
              bg="#d7a022"
              w="100px"
              h="37px"
              lineHeight="100%"
              onClick={() => setIsExpanded(!isExpanded)}
              display={isExpanded ? "none" : "block"}
              borderRadius="10px"
              {...rest}
            >
              <Flex>
                <Text
                  color="#ffff"
                  pt="0.5rem"
                  fontSize="xl"
                  fontWeight="500"
                  lineHeight="70%"
                >
                  Add
                </Text>
                <Icon as={IoAdd} color="#ffff" w="24px" h="24px" />
              </Flex>
            </Button>
          </Flex>
          <Flex justify="space-between">
            <Flex align="center" w="100%">
              {false ? (
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
                    <ModalCloseButton />
                    <Flex
                      justify="space-between"
                      ps="0px"
                      pe="20px"
                      pt="5px"
                      flexDirection={{ base: "column", lg: "row" }}
                      alignItems={{ base: "center", lg: "flex-start" }}
                    >
                      <ModalBody>
                        <Popover>
                          <PopoverTrigger>
                            <Text
                              color={textColor}
                              fontWeight="bold"
                              fontSize={{ base: "3xl", lg: "4xl" }}
                              lineHeight="150%"
                              mt={{ base: 0, lg: "3rem" }}
                              ml={{ base: 0, lg: "3rem" }}
                              mb="2rem"
                              textAlign={{ base: "center", lg: "3rem" }}
                            >
                              Please Complete
                              <br />
                              Remaining Payment!
                              <br />
                            </Text>
                          </PopoverTrigger>
                        </Popover>
                      </ModalBody>
                    </Flex>
                  </ModalContent>
                </Modal>
              ) : (
                <Flex justify="center" align="center" minHeight="80vh">
                  <Box
                    display={isExpanded ? "block" : "none"}
                    mt={{ base: "2rem", lg: "3rem" }}
                  >
                    {/* Form components go here */}
                    <Flex direction="column">
                      <Flex align="center" mb={{ base: "1rem", lg: "2rem" }}>
                        <Text color="#d7a022" fontSize="2xl" mr="3rem">
                          Ordinary
                        </Text>
                        <Box flex="1">
                          <Input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            placeholder="Add Share number"
                          />
                        </Box>
                      </Flex>
                      <Flex direction="column" mb="2rem">
                        <Text fontSize="lg">Choose Percentage:</Text>
                        <Flex flexWrap="wrap" pl="4rem" width="100%">
                          {dynamicOptions.map((option) => (
                            <Button
                              key={option.value}
                              variant={
                                selectedOption === option.value
                                  ? "solid"
                                  : "outline"
                              }
                              onClick={() => {
                                handlePercentageSelection(
                                  option.value,
                                  quantity
                                );
                                setButtonPersent(option.label);
                                setSelectedOption(option.value);
                              }}
                              mr={{ base: "0.5rem", lg: "1rem" }}
                              mb={{ base: "0.5rem", lg: 0 }}
                            >
                              {option.label}
                            </Button>
                          ))}
                        </Flex>
                        {calculatedAmount && (
                          <Text fontSize="lg" mt="1rem">
                            Calculated amount: {calculatedAmount} birr
                          </Text>
                        )}
                      </Flex>
                      <Text
                        color={textColor}
                        fontSize="xl"
                        fontWeight="700"
                        mb="1rem"
                      >
                        Payment Method
                      </Text>
                      <Flex
                        direction="column"
                        mb={{ base: "2rem", lg: "3rem" }}
                      >
                        <RadioGroup
                          value={paymentMethod}
                          onChange={handlePaymentMethodChange}
                        >
                          <Flex
                            direction={{ base: "column", lg: "row" }}
                            align="center"
                          >
                            <Radio value="bankTransfer" fontSize="lg">
                              Bank Transfer
                            </Radio>
                          </Flex>
                        </RadioGroup>
                        {paymentMethod === "bankTransfer" && (
                          <>
                            <Flex>
                              <Button
                                mt="1rem"
                                fontSize="lg"
                                rightIcon={<FiChevronRight />}
                                onClick={onOpen}
                              >
                                Select Bank
                              </Button>
                              <Popover isOpen={isOpen} onClose={onClose}>
                                <PopoverTrigger>
                                  <Button mt="4" fontSize="lg">
                                    {popoverHeaders}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <PopoverArrow />
                                  <PopoverCloseButton />
                                  <PopoverHeader>Options</PopoverHeader>
                                  <PopoverBody>
                                    <List spacing={3}>
                                      {["Abyssiniya", "СВЕ", "Awash"].map(
                                        (option, index) => (
                                          <ListItem
                                            key={index}
                                            onClick={() =>
                                              handleOptionClick(option)
                                            }
                                            _hover={{
                                              background: "gray.100",
                                              cursor: "pointer",
                                            }}
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                          >
                                            <Text fontSize="lg">{option}</Text>
                                          </ListItem>
                                        )
                                      )}
                                    </List>
                                  </PopoverBody>
                                </PopoverContent>
                              </Popover>
                            </Flex>

                            <Box w="100%" mt="1rem">
                              <Input
                                mb="0.5rem"
                                fontSize="lg"
                                placeholder="Enter account number"
                                value={accountNumber}
                                onChange={handleAccountNumberChange}
                              />
                            </Box>
                          </>
                        )}
                      </Flex>
                      <Flex
                        direction="column"
                        mb={{ base: "2rem", lg: "3rem" }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          id="upload"
                        />
                        <label htmlFor="upload">
                          <Button
                            bg="blue.200"
                            fontSize="sm"
                            as="span"
                            leftIcon={<FiCamera />}
                          >
                            Upload Image
                          </Button>
                        </label>
                        {uploadProgress > 0 && (
                          <div>Progress: {uploadProgress}%</div>
                        )}
                        {selectedFile && (
                          <div>Selected File: {selectedFile.name}</div>
                        )}
                        {selectedFile && (
                          <img
                            src={selectedFile}
                            alt="Uploaded"
                            style={{ maxWidth: "100px", marginTop: "0.5rem" }}
                          />
                        )}
                      </Flex>
                      <Flex justify="center">
                        <Button
                          onClick={() => setIsExpanded(false)}
                          flex="1"
                          color="#ffff"
                          backgroundColor="#d7a022"
                          fontSize="lg"
                          mr="0.5rem"
                        >
                          Back
                        </Button>
                        <Button
                          flex="1"
                          color="#ffff"
                          backgroundColor="#d7a022"
                          fontSize="lg"
                          onClick={handlePayButtonClick}
                        >
                          Pay
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              )}
            </Flex>
          </Flex>
        </>
      )}
    </Card>
  );
}
