/* eslint-disable */
// ... (other imports)

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { ChevronLeftIcon } from "@chakra-ui/icons";
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
import {useParams} from 'react-router-dom'

function SignIIn() {

  const formik = useFormik({
    initialValues: {
      previousPassword: '',  
      newPassword: '',
    },
    onSubmit: (values) => {
      let token = localStorage.getItem('token');
  // Check if token starts with "Bearer " and remove it if present
  if (token.startsWith("Bearer ")) {
    token = token.slice(7); // Remove "Bearer " prefix
  }
      axios.post(`http://localhost:2024/api/auth/updatePassword/${token}`, values)
        .then((res) => {
          console.log("heyyy", res.data)
          if (res.data.success === true){
            toast.success("Password is changed");
            // Redirect to a success page or login page
            // Update with your login page route
          } else {
            console.log("Whattt",res.data); 
            toast.error("Failed to reset password");
          }
        })
        .catch((err) => {
          console.log("What is the rror",err);
          toast.error("Failed to reset password");
        });
    }
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
          {/* <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              here
            </Text>
            <HSeparator />
          </Flex> */}
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
              Previous Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                onChange={formik.handleChange}
                value={formik.values.previousPassword}
                onBlur={formik.handleBlur}
                name="previousPassword"
                fontSize="2xl"
                placeholder=""
                mb="24px"
                size="lg"
                type="password" 
                textAlign="center" // Center-align the digits
                borderRadius="8px"
                
              />
            
            </InputGroup>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              New Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
                name="newPassword"
                fontSize="2xl"
                placeholder=""
                mb="24px"
                size="lg"
                type="password" 
                textAlign="center" // Center-align the digits
                borderRadius="8px"
                
              />
            
            </InputGroup>
            
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
              Submit
            </Button>

            <Flex align="center" mb="0px">
            {/* Add a Back button */}
            <Button
              onClick={() => {
                window.location.href = 'http://localhost:3000';
              }}
              leftIcon={<ChevronLeftIcon />}
              mr="2"
              fontSize="sm"
              color="#d7a022"
              fontWeight="500"
              h="50"
              backgroundColor="transparent"
              _hover={{ color: "#e9b334" }}
            >
              Back
            </Button>

            <Image
              // ... (other image properties)
            />
            <HSeparator mb="20px" />
          </Flex>
          </FormControl>
         
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIIn;
