import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import purposeBlackLogo from "../../../components/icons/purposeblackethiopia.png";

// Assets
import imgs from "assets/img/Purpose-black.jpg";
import { verifyOTP } from "../../../helper/helper";
import { useAuthStore } from "../../../store/store";

function SignIn() {
  const history = useHistory();
  const { username, token } = useAuthStore((state) => state.auth);
  const [otpValues, setOtpValues] = useState(['', '', '', '']); // Array to hold OTP values

  const handleChange = (index, value) => {
    const updatedOtpValues = [...otpValues];
    updatedOtpValues[index] = value;
    setOtpValues(updatedOtpValues);
    if (value && index < 3) {
      // Move focus to the next input box
      inputRefs[index + 1].current.focus();
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async () => {
      const otp = otpValues.join(''); // Concatenate OTP values
      try {
        const { status, data } = await verifyOTP({ otp });
        if (status === 200) {
          const { token } = data;
          localStorage.setItem('token', token);
          history.push("/admin/default");
          toast.success("Verification Successful!");
        } else {
          toast.error("Invalid token or verification failed!");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("Wrong OTP! Check again!");
      }
    },
  });

  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  // Array to hold refs for each input box
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

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
              OTP<Text color={brandStars}>*</Text>
            </FormLabel>
            <Flex>
              {otpValues.map((value, index) => (
                <Box key={index} mx="2" width="3rem" height="3rem" borderRadius="md" border="2px solid" ml='2rem' borderColor="gray.500" transition="border-color 0.3s ease-in-out">
                  <input
                    ref={inputRefs[index]} // Assign ref
                    type="number"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    maxLength={1}
                    style={{ width: '100%', height: '100%', textAlign: 'center', border: 'none', outline: 'none', fontSize: '1.5rem' }}
                  />
                </Box>
              ))}
            </Flex>
            <Button
              type="submit"
              fontSize="sm"
              color="#fff"
              fontWeight="500"
              w="100%"
              h="50"
              mt="1rem"
              backgroundColor="#d7a022"
              _hover={{ backgroundColor: "#e9b334" }}
              _active={{ backgroundColor: "#c1931e" }}
            >
              Sign In
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
