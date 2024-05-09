import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Text,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import React, { useMemo, useState, useRef, useEffect } from "react";
import imgss from "../../../../assets/img/Purpose-black.jpg";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { columnsDataCheck } from "../variables/columnsData";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import Chip from "@mui/material/Chip";
import html2pdf from "html2pdf.js";
import prupose from "../../../../components/icons/purposeblackethiopia.png";
import axios from "axios";
import "./assets/css/style.css";
import routes from "routes";
import Invoice from "views/admin/invoice";
export default function DevelopmentTable({ columnsData, tableData }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [shouldPrint, setShouldPrint] = useState(false);
  const [dynamicRoutes, setDynamicRoutes] = useState(routes);
  const [certificateVisible, setCertificateVisible] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  const addDynamicRoute = () => {
    // Check if the route is already added
    const templeteRouteExists = dynamicRoutes.some(
      (route) => route.path === "/invoice"
    );

    if (!templeteRouteExists) {
      // Add the dynamic route
      const newDynamicRoutes = [
        ...dynamicRoutes,
        {
          layout: "/admin",
          path: "/invoice",
          component: Invoice,
          hidden: true,
        },
      ];

      setDynamicRoutes(newDynamicRoutes);
    }
  };
  const handleDownload = () => {
    const invoiceNode = document.getElementById("tm_download_section");

    html2canvas(invoiceNode).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imageData;
      link.download = "invoice.png";

      link.click();
    });
  };

  const handleDownloadAsPDF = () => {
    const printArea = document.getElementById("print-area");

    if (printArea) {
      const options = {
        margin: 10,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf().from(printArea).set(options).save();
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  const handleRowClick = (rowData) => {
    console.log("Clicked row data:", rowData);
    setCertificateData(rowData);
    setCertificateVisible(true);
  };

  const orderItems = [{}];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
        };

        const response = await axios.get(
          "http://localhost:2024/api/shareHolder/dashBoard",
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
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Flex alignItems="center" mb="4">
        <Text fontSize="lg" fontWeight="bold" mr="4">
          Latest Transactions
        </Text>
        <Input
          placeholder="Search..."
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          w="40%"
          mr="2"
        />
        <Spacer />
        {/* <Button
          onClick={() => console.log("Show All clicked")}
          colorScheme="orange"
          size="sm"
        >
          Show All
        </Button> */}
      </Flex>
      <Table {...getTableProps()} variant="striped" colorScheme="gray">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr
              key={index}
              {...headerGroup.getHeaderGroupProps()}
              onClick={() => setSelectedRow(headerGroup)}
            >
              {headerGroup.headers.map((column, index) => (
                <Th key={index} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr
                key={index}
                {...row.getRowProps()}
               
                onClick={() => handleRowClick(row)}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
              >
                {row.cells.map((cell, index) => (
                  <Td key={index} {...cell.getCellProps()}>
                   
                      {cell.render("Cell")}
                    
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex justify="space-between" mt="4">
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Text>
          Page {pageIndex + 1} of {Math.ceil(data.length / 10)}
        </Text>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </Flex>
      {certificateVisible && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="rgba(0,0,0,0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="999"
        >
          <Box
            backgroundColor="white"
            padding="4"
            borderRadius="md"
            boxShadow="md"
          >
            <div className="tm_container">
              <div className="tm_invoice_wrap">
                <div
                  className="tm_invoice tm_style1 tm_type1"
                  id="tm_download_section"
                >
                  <div className="tm_invoice_in">
                    <div className="tm_invoice_head tm_top_head tm_mb15 tm_align_center">
                      <div className="tm_invoice_left">
                        <div className="tm_logo">
                          <img src={prupose} alt="Logo" />
                        </div>
                      </div>
                      <div className="tm_invoice_right tm_text_right tm_mobile_hide">
                        <div className="tm_f50 tm_text_uppercase tm_white_color">
                          Invoice
                        </div>
                      </div>
                      <div className="tm_shape_bg tm_accent_bg tm_mobile_hide"></div>
                    </div>
                    <div className="tm_invoice_info tm_mb25">
                      <div className="tm_card_note tm_mobile_hide">
                        <b className="tm_primary_color">Payment Method: </b>
                        {certificateData.original.paymentMethod}
                      </div>
                      <div className="tm_invoice_info_list tm_white_color">
                        <p className="tm_invoice_number tm_m0">
                          Invoice No: <b>{certificateData.original.transaction_id}</b>
                        </p>
                        <p className="tm_invoice_date tm_m0">
                          Date: <b>{formatDate(certificateData.original.createdAt)}</b>
                        </p>
                      </div>
                      <div className="tm_invoice_seperator tm_accent_bg"></div>
                    </div>
                    <div className="tm_invoice_head tm_mb10">
                      <div className="tm_invoice_left">
                        <p className="tm_mb2">
                          <b className="tm_primary_color">Invoice To:</b>
                        </p>
                        <p>
                          status:
                          {certificateData.original.status}
                          <br />
                          manual_receipt_issued:
                          {certificateData.original.manual_receipt_issued}
                          <br />
                          paidAmount:
                          {certificateData.original.paidAmount} birr
                          <br />
                        </p>
                      </div>
                      <div className="tm_invoice_right tm_text_right">
                        <p className="tm_mb2">
                          <b className="tm_primary_color">Pay To:</b>
                        </p>
                        <p>
                          PurposeBlackETH <br />
                          Sengatera Negadewoch Hibret BLDG,
                          <br />
                          Addis Ababa
                        </p>
                      </div>
                    </div>
                    <div className="tm_table tm_style1">
                      <div className="">
                        <div className="tm_table_responsive">
                          <table>
                            <thead>
                              <tr className="tm_accent_bg">
                                <th className="tm_width_3 tm_semi_bold tm_white_color">
                                  Name
                                </th>
                                <th className="tm_width_4 tm_semi_bold tm_white_color">
                                  Email
                                </th>
                                <th className="tm_width_2 tm_semi_bold tm_white_color">
                                  Price
                                </th>
                                <th className="tm_width_1 tm_semi_bold tm_white_color">
                                  Phone Number
                                </th>
                                <th className="tm_width_2 tm_semi_bold tm_white_color tm_text_right">
                                  Address
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="tm_width_3">
                                  {res.info.first_name} {"  "}
                                  {res.info.last_name}
                                </td>
                                <td className="tm_width_4">{res.info.email}</td>
                                <td className="tm_width_2">
                                  {certificateData.original.paidAmount}
                                </td>
                                <td className="tm_width_1">{res.info.phone}</td>
                                <td className="tm_width_2 tm_text_right">
                                  {res.info.address}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="tm_note tm_text_center tm_font_style_normal">
                      <hr className="tm_mb15" />
                    </div>
                  </div>
                </div>
                <div className="tm_invoice_btns tm_hide_print">
                  <a
                    href="#"
                    onClick={() => window.print()} // Change the href attribute to "#" and add onClick event handler to print
                    className="tm_invoice_btn tm_color1"
                  >
                    <span className="tm_btn_icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ionicon"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        />
                      </svg>
                    </span>
                    <span className="tm_btn_text">Print</span>
                  </a>
                  <button
                    id="tm_download_btn"
                    className="tm_invoice_btn tm_color2"
                    onClick={handleDownload} // Add onClick event handler to trigger download
                  >
                    <span className="tm_btn_icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ionicon"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        />
                      </svg>
                    </span>
                    <span className="tm_btn_text">Download</span>
                  </button>
                </div>
              </div>
            </div>
            <Button color="red" onClick={() => setCertificateVisible(false)}>
              Close
            </Button>
          </Box>
        </Box>
      )}
      {/* Updated Modal */}
    </Box>
  );
}