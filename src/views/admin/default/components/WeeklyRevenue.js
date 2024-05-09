// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import BarChart from "components/charts/BarChart";
import React from "react";


import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts";
import { MdBarChart } from "react-icons/md";


export default function WeeklyRevenue(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");

  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
const bgButton = "d7a022";
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
      <Text
          ml='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          What's New
        </Text>
        {/* <Button
          align='center'
          justifyContent='center'
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w='37px'
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          {...rest}>
          <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
        </Button> */}
      </Flex>

      <Box h='340px' mt='auto' display='flex' alignItems='center' justifyContent='center'>
        
      {/* <Text
          me='auto'
          color={textColor}
          alignItems='center' justifyContent='center'
          fontWeight='50'
          lineHeight='100%'>
          Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s, when an unknown
orinter took a aallev of tvoe and scrambled it to make  Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s, when an unknown
orinter took a aallev of tvoe and scrambled it to make  Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industry's

orinter took a aallev of tvoe and scrambled it to make.... 
<br />
          
          <br />
          <a href="#" style={{ fontWeight: "bold" }}>
            Read More
          </a>
        </Text> */}
        <Text style={{ fontWeight: "bold", fontSize:"2rem" , marginBottom:'4rem', marginLeft:'7rem'}} me='auto' color={textColor}> Coming Soon.........!!!</Text>
        {/* <BarChart
          chartData={barChartDataConsumption}
          chartOptions={barChartOptionsConsumption}
        /> */}
      </Box>
      <Button
            bg={`#${bgButton}`}
            fontSize='sm'
            fontWeight='500'
            color='#ffff'
            borderRadius='7px'>
            {/* <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me='4px'
            /> */}
            Show All
          </Button>
    </Card>
  );
}
