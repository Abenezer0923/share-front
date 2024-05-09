import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  extendTheme,
  CSSReset,
  Button,
} from "@chakra-ui/react";
import prupose from "../../../../components/icons/purposeblackethiopia.png";
import html2canvas from 'html2canvas'; // Import html2canvas library
import "./style.css";
import { useLocation } from 'react-router-dom'; // Importing useLocation hook

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
});

const CertificatePage = () => {
  const [res, setRes] = useState(null);
  const location = useLocation(); 
  const { state } = location;
  console.log("Location state:", state);
  const theData = state ? state.theData : null;
  console.log("heyy", theData)

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (!theData) {
      return <p>There is no data</p>;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
        };

        const response = await axios.get(
           process.env.REACT_APP_API_URL,
          { headers }
        );

        const apiData = response.data.data;
        console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        const res = { obj: apiData.payment_history.slice(0, 3) };
        const curr = { ans: apiData.completedShareInfo.slice(0, 3) };
        const info = apiData.shareHolderInfo;

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
  }, [theData]); 

  const handleDownload = () => {
    const invoiceNode = document.getElementById("tm_download_section");

    html2canvas(invoiceNode).then(canvas => {
      const imageData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imageData;
      link.download = "invoice.png";

      link.click();
    });
  };

  if (!theData) {
    return <div>No valid data selected</div>;
  }

  if (!res) {
    return null; 
  }

  return (
    <ChakraProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
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
                    {theData.paymentMethod}
                  </div>
                  <div className="tm_invoice_info_list tm_white_color">
                    <p className="tm_invoice_number tm_m0">
                      Invoice No: <b>{theData.transaction_id}</b>
                    </p>
                    <p className="tm_invoice_date tm_m0">
                      Date: <b>{formatDate(theData.createdAt)}</b>
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
                      status: {theData.status} <br />
                      manual_receipt_issued: {theData.manual_receipt_issued} <br />
                      paidAmount: {theData.paidAmount} <br />
                    </p>
                  </div>
                  <div className="tm_invoice_right tm_text_right">
                    <p className="tm_mb2">
                      <b className="tm_primary_color">Pay To:</b>
                    </p>
                    <p>
                      PurposeBlackETH <br />
                      Sengatera Negadewoch Hibret BLDG,<br /> 
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
                            <td className="tm_width_3">{res.info.first_name} {res.info.last_name}</td>
                            <td className="tm_width_4">
                              {res.info.email}
                            </td>
                            <td className="tm_width_2">{theData.paidAmount}</td>
                            <td className="tm_width_1">{res.info.phone}</td>
                            <td className="tm_width_2 tm_text_right">{res.info.address}</td>
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
      </Box>
    </ChakraProvider>
  );
};

export default CertificatePage;
