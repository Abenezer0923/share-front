

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import purposeBlackLogo from "../../../components/icons/purposeblackethiopia.png";


import imgs from "assets/img/Purpose-black.jpg"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import {  verifyEmail } from "../../../helper/helper";

import { useAuthStore } from "../../../store/store";

function SignIIn() {
  const history = useHistory();
  const { username, token } = useAuthStore((state) => state.auth);
  const [show, setShow] = useState(false);


  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { email } = values;
    
        // Make the email verification request
        const { status, data } = await verifyEmail({ email });
    
        console.log("Server response:", data); // Log the entire response
    
        if (status === 200) {
          toast.success("sent the email ");
          history.push("/auth/cheakEmail");
        } else {
          toast.error("Invalid email");
        }
      } catch (error) {
        console.error("Error verifying Email:", error);
        toast.error("Wrong Email! Check again!");
      }
    },
    
  });
  
  const textColor = useColorModeValue("navy.700", "white");

  const brandStars = useColorModeValue("brand.500", "brand.400");

  return (
    <DefaultAuth illustrationBackground={imgs} image={imgs}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
          boxShadow="lg"
          padding="3rem"
        >
          <Flex align="center" mb="0px">
            <Image
              src={purposeBlackLogo}
              alt="Purpose Black Ethiopia Logo"
              my="0px"
            />
            <HSeparator mb="20px" />
          </Flex>
          <FormControl as="form" onSubmit={formik.handleSubmit}>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Email
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                name="email"
                fontSize="2xl"
                placeholder=""
                mb="24px"
                size="lg"
                type="email" 
                textAlign="center" // Center-align the digits
                borderRadius="8px"
                
              />
            </InputGroup>
            <Flex justifyContent="space-between" align="center" mb="24px">
            </Flex>
            <Button
              type="submit"
              fontSize="sm"
              color = '#fff'
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              backgroundColor="#d7a022"
              _hover={{ backgroundColor: "#e9b334" }} // Add hover effect
              _active={{ backgroundColor: "#c1931e" }}
            >
              Send
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
           
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIIn;
