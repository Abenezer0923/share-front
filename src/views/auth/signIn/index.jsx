/* eslint-disable */
// ... (other imports)

import React, { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import purposeBlackLogo from "../../../components/icons/purposeblackethiopia.png";
import { useFormik } from "formik";
import imgs from "assets/img/Purpose-black.jpg";
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
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";

// Assets
import { usernameValidate } from "../../../helper/validate";
import ii from "assets/img/ETH.png";
import ll from "assets/img/ppp.jpg";
import { FcGoogle } from "react-icons/fc";
import useFetch from "../../../hooks/fetch.hook";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { verifyPassword, generateOTP, verifyOTP } from "../../../helper/helper";
import { passwordValidate } from "../../../helper/validate";
import { useAuthStore } from "../../../store/store";

function SignIIn() {
  const history = useHistory();
  const setUsername = useAuthStore((state) => state.setUsername);
  const { username } = useAuthStore((state) => state.auth);


  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
     
      setUsername(values.username);

      let loginPromise = verifyPassword({
        username: values.username,
        password: values.password,
      });

      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Sent OTP Successfully Check Your email</b>,
        error: <b>Password Not Match!</b>,
      });
      loginPromise
        .then((res) => {
          
          history.push("/auth/otp");
        })
        .catch((error) => {
          
          console.error(error);
        });
    },
  });

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        
        history.push("/auth/sign-in");
      }
    };

    
    checkToken();
  }, [history]);

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
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08);" 
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
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              UserName<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              {...formik.getFieldProps("username")}
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="username"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                {...formik.getFieldProps("password")}
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
               
              </FormControl>
             
            </Flex>

            <Button
              onClick={formik.handleSubmit}
              fontSize="sm"
              color="#fff"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              backgroundColor="#d7a022"
              _hover={{ backgroundColor: "#e9b334" }} // Add hover effect
              _active={{ backgroundColor: "#c1931e" }}
            >
              Sign In
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
             <Text
          color={textColorDetails}
          fontWeight="400"
          fontSize="14px"
          onClick={() => history.push("/auth/forgetPassword")}
          style={{ cursor: "pointer" }}
        >
          Forgot Password?
        </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIIn;
