import {

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

      initialState,
    } = tableInstance;
    initialState.pageSize = 5;
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    return (
      <Card direction="column" w="100%" p="0"  h='340px' overflowX={{ sm: "scroll", lg: "hidden" }}>
      {/* ... (Assuming other content will be added to the Card in the future) */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/bLO7zv73wDw"
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </Card>
    );
  }
  