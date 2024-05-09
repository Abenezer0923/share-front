import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='80%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='center'  align='center'>
        <Text
         
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Dividend
        </Text>
        {/* <Menu /> */}
      </Flex>
     
      <Box h='340px' mt='auto' display='flex' alignItems='center' justifyContent='center'>
        
        <Text
            textAlign='center' 
            color={textColor}
            alignItems='center' justifyContent='center'
            fontWeight='bold'
            lineHeight='100%'>
  Congrats, you have got 10% ETB dividend
from your total amount of share 

          </Text>
        
        </Box>
    </Card>
  );
}
