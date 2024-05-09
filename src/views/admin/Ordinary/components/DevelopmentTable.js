/* eslint-disable */
import {
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Flex,
  Text,
  Tr,
  Th,
  Td,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useColorModeValue,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import prupose from "../../../../components/icons/purposeblackethiopia.png"; 
import { Link } from "react-router-dom";

import img from "../../../../assets/img/Purpose-black.jpg";
import html2pdf from "html2pdf.js";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import { columnsDataCheck } from "../variables/columnsData";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";



const bgButton = "d7a022";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;
  const [selectedRow, setSelectedRow] = useState(null);
  const [shouldPrint, setShouldPrint] = useState(false); 
  const [res, setRes] = useState(null);

  const columns = useMemo(
    () =>
      columnsDataCheck.map((column) => {
        if (column.Header === "DATE") {
          return {
            ...column,
            Cell: ({ value }) => <div>{formatDate(value)}</div>,
          };
        }
        return column;
      }),
    [columnsDataCheck]
  );

  const data = useMemo(() => tableData, [tableData]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleDownloadAsPDF = () => {
    const printArea = document.getElementById('print-area');
    
    if (printArea) {
      const options = {
        margin: 10,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
  
      html2pdf().from(printArea).set(options).save();
    }
  };

;
const handlePrint = () => {
  const printArea = document.getElementById('print-area');

  if (printArea) {
    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Apply styles directly to the iframe content
    iframeDoc.body.innerHTML = printArea.innerHTML;

    // Wait for the iframe to load before triggering the print
    iframe.onload = () => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    };
  }
};

const tableInstance = useTable(
  {
    columns,
    data,
  },
  useGlobalFilter,
  useSortBy,
  usePagination
);

const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  tableInstance;
const textColor = useColorModeValue("secondaryGray.900", "white"); 

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
      };

      const response = await axios.get(
        "https://api.purposeblacketh.com/api/shareHolder/dashBoard/",
        { headers }
      );

      const apiData = response.data.data;
      console.log("apis", apiData);
      const res = { obj: apiData.payment_history.slice(0, 3) };
      const curr = { ans: apiData.completedShareInfo.slice(0, 3) };
      const info = apiData.shareHolderInfo;

      console.log("currr", curr);
      console.log("infooo", info);

      const franchiseData = {
        name: "Franchise",
        growth: "buy",
        value: apiData.completedShareInfo[1]?.numberOfShare || "0",
      };
      const ordinaryData = {
        name: "Ordinary",
        growth: "buy",
        value: apiData.completedShareInfo[0]?.numberOfShare || "0",
      };
      const tsmData = {
        name: "TSM",
        growth: "buy",
        value: apiData.completedShareInfo[2]?.numberOfShare || "0",
      };
      const totalData = {
        name: "Total",
        value:
          parseInt(franchiseData.value) +
          parseInt(ordinaryData.value) +
          parseInt(tsmData.value),
      };

      setRes({
        franchiseData,
        ordinaryData,
        tsmData,
        totalData,
        checkTableData: res.obj,
        shareInfo: curr.ans,
        info,
      });
    } catch (error) {
      console.error("Error fetching res:", error);
    }
  };

  fetchData();
}, []); // Empty dependency array to ensure the effect runs only once

if (!res) {
  // Render loading state or return null
  return null;
}
console.log("name", res.info.first_name);


  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Latest Transactions
        </Text>
        <Link to="data-tables" style={{ textDecoration: "none" }}>
        <Button
          bg={`#${bgButton}`}
          ml="auto"
          fontSize="sm"
          fontWeight="500"
          color="#ffff"
          borderRadius="7px"
        >
          Show All
        </Button>

        </Link>
        
      </Flex>

      <Table
        {...getTableProps()}
        variant="simple"
        css={`
          tbody tr:hover {
            background-color: rgba(0, 0, 0, 0.05);
            cursor: pointer;
          }
        `}
        color="gray.500"
        mb="24px"
      >
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                >
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <React.Fragment key={index}>
                <Tr {...row.getRowProps()} onClick={() => setSelectedRow(row)}>
                  {row.cells.map((cell, index) => (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              </React.Fragment>
            );
          })}
        </Tbody>
      </Table>

      {/* Updated Modal */}
      {selectedRow && (
        <Modal
          isOpen={!!selectedRow}
          onClose={() => {
            setSelectedRow(null);
            setShouldPrint(false);
          }}
          isCentered
          size="2xl"
        >
          <ModalOverlay />
          <ModalContent bg="white" p={6} borderRadius="md">
            {/* <ModalHeader>
              <h3>Invoice Details</h3>
            </ModalHeader> */}
            <ModalBody>
              <ModalCloseButton color="gray.700" />
              <Box>
                <div className="invoice-wrapper" id="print-area">
                  <div className="invoice">
                    <div className="invoice-container">
                      <div className="invoice-head">
                        <div className="invoice-head-top">
                          <div className="invoice-head-top-left text-start">
                            <img src={prupose} alt="Company Logo" />
                          </div>
                          <div className="invoice-head-top-right text-end">
                            <h3>Invoice Details</h3>
                          </div>
                        </div>
                        <div className="hr"></div>
                        <div className="invoice-head-middle">
                          <div className="invoice-head-middle-left text-start">
                            <p>
                              <span className="text-bold">Date:</span>{" "}
                              {selectedRow.original &&
                                formatDate(selectedRow.original.createdAt)}
                            </p>
                          </div>
                          <div className="invoice-head-middle-right text-end">
                            <p>
                              <span className="text-bold">Address:</span>{" "}
                              {res.info.address}
                            </p>
                          </div>
                        </div>
                        <div className="hr"></div>
                        <div className="invoice-head-bottom">
                          <div className="invoice-head-bottom-left">
                            <ul className="text-start">
                              <span className="text-bold">Name:</span>{" "}
                              {res.info.first_name} {res.info.last_name}
                            </ul>
                          </div>
                          <div className="invoice-head-bottom-right">
                            <ul className="text-end">
                              <span className="text-bold">PayTo:</span>{" "}
                              PurposeBlackETH
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="overflow-view">
                        <div className="invoice-body">
                          <table>
                            <thead>
                              <tr>
                                <td className="text-bold">Bill Number</td>
                                <td className="text-bold">Paid Amount</td>
                                <td className="text-bold">status</td>
                                <td className="text-bold">Payment Method</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{selectedRow.original.bill_ref_number}</td>
                                <td>{selectedRow.original.paidAmount}</td>
                                <td>{selectedRow.original.status}</td>
                                <td>{selectedRow.original.paymentMethod}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="invoice-body-bottom">
                            <div className="invoice-body-info-item border-bottom">
                              <div className="info-item-td text-end text-bold">
                                Transaction ID:
                              </div>
                              <div className="info-item-td text-end">
                                {selectedRow.original.transaction_id}
                              </div>
                            </div>
                            <div className="invoice-body-info-item border-bottom">
                              <div className="info-item-td text-end text-bold">
                                Phone:
                              </div>
                              <div className="info-item-td text-end">
                                {res.info.phone}
                              </div>
                            </div>
                            <div className="invoice-body-info-item border-bottom">
                              <div className="info-item-td text-end text-bold">
                                Email:
                              </div>
                              <div className="info-item-td text-end">
                                {res.info.email}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="invoice-foot text-center">
                        <p>
                          <span className="text-bold text-center">
                            Address:&nbsp;
                          </span>
                          Sengatera Negadewoch Hibret BLDG, Addis Ababa
                        </p>
                        <div className="invoice-btns">
                          {/* <button
            type="button"
            className="invoice-btn"
            onClick={() => {
              handlePrint(); // Trigger print when the print button is clicked
             // Reset the state after download/print
            }}
          >
                            <span>Print</span>
                          </button> */}
                          <button
                            type="button"
                            className="invoice-btn"
                            onClick={handleDownloadAsPDF}
                          >
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
}
