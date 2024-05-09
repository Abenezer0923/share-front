import React, { useRef, useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { useReactToPrint } from 'react-to-print'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import "invoice.css"



const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

// ======= modal imports====
const Invoice = () => {

  const orderItems = [
    {


  }
]

  const router = useRouter()

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  return (
    <>
      {/* =======modal====== */}

      <React.Fragment>
      </React.Fragment>

      {/* =======modal====== */}
      <div className='tm_container html'>
        <div className='tm_invoice_wrap'>
          <div className='tm_invoice tm_style1 tm_type1' id='tm_download_section' ref={componentRef}>
            <div className='tm_invoice_in'>
              <div className='tm_invoice_head tm_top_head tm_mb15 tm_align_center'>
                <div className='tm_invoice_left'>
                  <div className='tm_logo'>
                    <img src='/images/PBETH/pbethLogo.png' alt='Logo' style={{ width: '15rem' }} />
                  </div>
                </div>
                <div className='tm_invoice_right tm_text_right tm_mobile_hide'>
                  <div className='tm_f50 tm_text_uppercase tm_white_color'>Order Details</div>
                </div>
                <div className='tm_shape_bg tm_accent_bg tm_mobile_hide'></div>
              </div>
              <div className='tm_invoice_info tm_mb25'>
               
                  <div className='tm_card_note tm_mobile_hide'>
                    <b className='tm_primary_color'>Payment Status: </b>
                    <Chip
                      label='gfhjkjjkh'
                      color={statusObj[order.status].color}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </div>
               
               
                  <div className='tm_card_note tm_mobile_hide'>
                    <b className='tm_primary_color'>Insoice Status: </b>
                    <Chip
                      label='VOIDED'
                      color='primery'
                      sx={{
                        height: 24,
                        fontSize: '1.5rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </div>
               
                <div className='tm_invoice_info_list tm_white_color'>
                  <p className='tm_invoice_number tm_m0'>
                    Invoice No: <b>7854</b>
                  </p>
                  <p className='tm_invoice_date tm_m0'>
                    Date: <b>74126</b>
                  </p>
                </div>
                <div className='tm_invoice_seperator tm_accent_bg'></div>
              </div>
              <div className='tm_invoice_head tm_mb10'>
                <div className='tm_invoice_left'>
                  <p className='tm_mb2'>
                    <b className='tm_primary_color'>Invoice To: poiuy</b>
                  </p>
                  <p>
                    Client <br />
                    Somewhere, Addis Abeba <br />
                    Ethiopia <br />
                    {/* {user.email} / {user.phone} */}
                  </p>
                </div>
                <div className='tm_invoice_right tm_text_right'>
                  <p className='tm_mb2'>
                    <b className='tm_primary_color'>Pay To:</b>
                  </p>
                  <p>
                    PBEth <br />
                    Sengatera, Addis Abeba
                    <br />
                    Ethiopia <br />
                    PBEth@gmail.com
                  </p>
                </div>
              </div>
              <div className='tm_table tm_style1'>
                <div className=''>
                  <div className='tm_table_responsive'>
                    <table>
                      <thead>
                        <tr className='tm_accent_bg'>
                          <th className='tm_width_3 tm_semi_bold tm_white_color'>Item</th>
                          {/* <th className='tm_width_4 tm_semi_bold tm_white_color'>Description</th> */}
                          <th className='tm_width_2 tm_semi_bold tm_white_color'>Price</th>
                          <th className='tm_width_1 tm_semi_bold tm_white_color'>Qty</th>
                          <th className='tm_width_2 tm_semi_bold tm_white_color tm_text_right'>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orderItems !== null ? (
                          orderItems.map((item, key) => (
                            <tr key={key}>
                              <td key={item._id} className='tm_width_3'>
                                kllk;l;l
                              </td>
                              {/* <td key={item._id} className='tm_width_4'>
                                {item.price}
                              </td> */}
                              <td key={item._id} className='tm_width_2'>
                                88
                              </td>
                              <td className='tm_width_1'>{item.quantity}</td>
                              <td className='tm_width_2 tm_text_right'>ETB</td>
                            </tr>
                          ))
                        ) : (
                          <></>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='tm_invoice_footer tm_border_top tm_mb15 tm_m0_md'>
                  <div className='tm_left_footer'>
                    <p className='tm_mb2'>
                      <b className='tm_primary_color'>Payment info:</b>
                    </p>
                    <p className='tm_m0'>Amount: 55 ETB</p>
                  </div>
                  <div className='tm_right_footer'>
                    <table className='tm_mb15'>
                      <tbody>
                        <tr className='tm_gray_bg '>
                          <td className='tm_width_3 tm_primary_color tm_bold'>Subtoal</td>
                          <td className='tm_width_3 tm_primary_color tm_bold tm_text_right'>
                            88 ETB
                          </td>
                        </tr>
                        <tr className='tm_gray_bg'>
                          <td className='tm_width_3 tm_primary_color'>
                            Tax <span className='tm_ternary_color'>(5%)</span>
                          </td>
                          <td className='tm_width_3 tm_primary_color tm_text_right'>
                            99 ETB
                          </td>
                        </tr>
                        <tr className='tm_accent_bg'>
                          <td className='tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color'>Grand Total </td>
                          <td className='tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color tm_text_right'>
                            64 ETB
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='tm_invoice_footer tm_type1'>
                  <div className='tm_left_footer'></div>
                  <div className='tm_right_footer'>
                    <div className='tm_sign tm_text_center'>
                      <img src='assets/img/sign.svg' alt='Sign' />
                      <p className='tm_m0 tm_ternary_color'></p>
                      <p className='tm_m0 tm_f16 tm_primary_color'></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='tm_note tm_text_center tm_font_style_normal'>
                <hr className='tm_mb15' />
                <p className='tm_mb2'>
                  <b className='tm_primary_color'>Terms & Conditions:</b>
                </p>
                <p className='tm_m0'>
                  All claims relating to quantity or shipping errors shall be waived by Buyer unless made in writing to
                  <br />
                  Seller within thirty (30) days after delivery of goods to the address stated.
                </p>
              </div>
            </div>
          </div>
          <div className='tm_invoice_btns tm_hide_print'>
            <button className='tm_invoice_btn tm_color1' onClick={handlePrint}>
              <span className='tm_btn_icon'>
                <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
                  <path
                    d='M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinejoin='round'
                    strokeWidth='32'
                  />
                  <rect
                    x='128'
                    y='240'
                    width='256'
                    height='208'
                    rx='24.32'
                    ry='24.32'
                    fill='none'
                    stroke='currentColor'
                    strokeLinejoin='round'
                    strokeWidth='32'
                  />
                  <path
                    d='M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinejoin='round'
                    strokeWidth='32'
                  />
                  <circle cx='392' cy='184' r='24' fill='currentColor' />
                </svg>
              </span>
              <span className='tm_btn_text'>Print</span>
            </button>
            <button id='tm_download_btn' className='tm_invoice_btn tm_color2'>
              <span className='tm_btn_icon'>
                <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
                  <path
                    d='M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='32'
                  />
                </svg>
              </span>
              <span className='tm_btn_text'>Download</span>
            </button>
            
          </div>
        </div>
      </div>
     
    </>
  ) 
}


export default Invoice
