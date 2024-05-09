import React, { useRef, useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import { useReactToPrint } from 'react-to-print'

// import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'
import Cookies from 'js-cookie'

// ======= modal imports====

// import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import Close from 'mdi-material-ui/Close'
import Chip from '@mui/material/Chip'
import { addPaidInfo } from 'src/redux/ifPaidSlice'

import { useSelector, useDispatch } from 'react-redux'
import { getOrder } from 'src/redux/orderSlice'
import CheckIfPaid from './CheckIfPaid'

import { addItemToCart, addOrderToCart } from 'src/redux/editCartSlice'
import { addOrderToComment, getOrderInComment } from 'src/redux/commentSlice'
import { useRouter } from 'next/router'
import EditedInvoice from './editedInvoice'

// import Cookies from 'js-cookie'

const statusObj = {
  REJECTED: { color: 'error' },
  PENDING: { color: 'warning' },
  PAID: { color: 'success' },
  ACCEPTED: { color: 'success' },
  PROCESSED: { color: 'info' },
  NOT_PAID: { color: 'info' }
}

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
  // ===fetch dtas states====
  const [eorderItems, setEorderItems] = useState([])
  const [ord, setOrd] = useState([])

  const [eorder, setEorder] = useState({})

  const [user, setUser] = useState({
    name: '',
    email: ''
  })

  const [euser, setEuser] = useState({
    ename: '',
    eemail: ''
  })

  const router = useRouter()

  const orderId = router.query.slug
  const endpoint = 'order/' + orderId

  let [order, settingUser] = useState([])

  const fetchData = async () => {
    // ********

    await axios.get(process.env.NEXT_PUBLIC_API_URL + endpoint).then(res => {
      settingUser(res.data)
      setEorder(res.data)
    })
    const userId = order.userId
    const userUrl = process.env.NEXT_PUBLIC_API_URL + 'auth/' + userId
    const resp = await axios.get(userUrl)
    setUser({
      name: resp.data.name,
      email: resp.data.email
    })
  }

  // console.log('Order: ', order)
  // console.log('Order Items: ', orderItems)
  // console.log('Order Items iddddd: ', order._id)

  useEffect(() => {
    fetchData()

    // if (order) {
    //   setOrderItems(order.orderItems)
    // }
  }, [])

  console.log(endpoint)
  console.log('Order ', order)

  // console.log('Order items', orderItems)

  // ======= modal states====

  const [open, setOpen] = React.useState(false)
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [visible2, setVisible2] = React.useState(false)

  const handleOpenConfirm = () => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const changer = () => {
    setVisible(true)
    setVisible2(false)
  }

  const changer2 = () => {
    setVisible2(true)
    setVisible(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'order/status/'

  const handleAccept = () => {
    const url = baseUrl + order._id

    const body = {
      status: 'ACCEPTED'
    }
    axios
      .patch(url, body, { withCredentials: true })
      .then(resp => {
        setOpenConfirm(false)
        console.log('Request ACCEPTED!')

        const creditBody = {
          userId: order.userId,
          userName: order.userName,
          userEmail: order.userEmail,
          orderId: order._id,
          editOrderId: Array(10)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join(''),
          products: order.products,
          totalPrice: order.totalPrice,
          isDelivered: order.isDelivered
        }

        axios
          .post(process.env.NEXT_PUBLIC_API_URL + 'credit', creditBody, { withCredentials: true })
          .then(credResp => {
            console.log('Requested Credit Accepted: ', credResp)
          })
          .catch(err => {
            console.log('Error in accepting the requested credit: ', err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleReject = () => {
    const url = baseUrl + order._id

    const body = {
      status: 'REJECTED'
    }
    axios
      .patch(url, body, { withCredentials: true })
      .then(resp => {
        console.log('Request REJECTED!')
        setOpenConfirm(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handlePaid = () => {
    // setOpenConfirm(false)

    const url = baseUrl + order._id

    const body = {
      status: 'PAID'
    }
    axios
      .patch(url, body, { withCredentials: true })
      .then(resp => {
        console.log('Paid!')
        setOpenConfirm(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleEdit = () => {
    console.log('Befor dispatch to editCartSlice: ', order.orderItems)
    dispatch(addItemToCart(order.orderItems))
    dispatch(addOrderToCart(order))
    router.push('/warehouse/returned/editcart')

    // setOpenConfirm(false)
  }

  const handleProcessed = () => {
    setOpenConfirm(false)
  }

  const handleComment = () => {
    console.log('Befor dispatch to editCartSlice: ', order)
    dispatch(addOrderToComment(order))
    router.push('/comment')
  }

  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(files[0])
        setViewRP(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }

  // ======= modal states====

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  // const [role, setRole] = useState(false)

  // usercomtent

  const jwt = Cookies.get('jwt')
  const id = Cookies.get('id')
  const name = Cookies.get('name')
  const email = Cookies.get('email')
  const roles = Cookies.get('role')
  const phone = Cookies.get('phone')

  // const condition = roles => {
  //   setRole(roles)
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  // mark as paid sectiom
  const [imgPaid, setImgPaid] = useState('/images/PBETH/pbethLogo.png')

  const [paidAmount, setPaidAmount] = useState(0)

  const [viewRP, setViewRP] = useState('/images/PBETH/pbethLogo.png')

  const handleChange = e => {
    setPaidAmount({ [e.target.name]: Number(e.target.value) })
  }

  const onImgPaidChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgPaid(files[0])
        setViewRP(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }
  const dispatch = useDispatch()

  const uploadFiles = async () => {
    const creditUrl = process.env.NEXT_PUBLIC_API_URL + 'credit/'
    const resp = await axios.get(creditUrl)
    const res = resp.data.find(credit => credit.orderId === order._id)
    const creditId = res._id

    Cookies.set('creditId', creditId)

    const formData = new FormData()
    formData.append('file', imgPaid)

    try {
      const paidAmountResp = await axios.patch(creditUrl + creditId, paidAmount)
      console.log('Paid Amount: ', paidAmountResp)
    } catch (err) {
      console.log('Error updating paidAmount: ', err)
    }

    try {
      const receiptUrl = creditUrl + 'upload/' + creditId
      const imgPostResp = await axios.post(receiptUrl, formData)
      console.log('Receipt upload success: ', imgPostResp)
      handlePaid()
      setOpen(false)
    } catch (err) {
      console.log('Erro in uploading receipt', err)
    }

    // dispatch(
    //   addPaidInfo({
    //     file5: imgPaid
    //   })
    // )
  }

  const handleApprove = async () => {
    // setOpenAlert3(true)

    const newUserUrl = baseUrl + 'new-user/' + newUserId
    const createCustomerUrl = baseUrl + 'customer'

    const newUser = await axios.get(newUserUrl)
    console.log('New User: ', newUser)

    // }

    const newCustomer = {
      name: newUser.data.name,
      email: newUser.data.email,
      phone: newUser.data.phone,
      company: newUser.data.company,
      documents: newUser.data.documents,
      userId: signupResp.data._id,
      approvedBy: `${Cookies.get('name')}, ${Cookies.get('email')} `
    }
    console.log('New Customer: ', newCustomer)

    const createCustomerResp = await axios.post(createCustomerUrl, newCustomer)
    const id = createCustomerResp.data._id
    const url = process.env.NEXT_PUBLIC_API_URL + 'customer/' + id
    try {
      const resp = await axios.patch(url, creditInfo)

      const creditInfoUrl = baseUrl + 'credit-info'

      const creditInfoData = {
        creditAmt: Number(resp.data.creditInfo),
        userId: signupResp.data._id
      }

      const creditInfoResp = await axios.post(creditInfoUrl, creditInfoData, { withCredentials: true })
      if (creditInfoResp.data._id) {
        console.log(`User ${signupResp.data.name} is now officially a customer of PB Credit`)
      }

      // console.log('Credit info update response: ', resp)
      await axios
        .delete(newUserUrl)
        .then(resp => {
          console.log('Transfering new-user to customer is successfull')
        })
        .catch(err => {
          console.log('Error on transfering new-user to customer: ', err)
        })
    } catch (err) {
      console.log('Credit info update error: ', err)
    }
  }

  // mark as paid sectiom

  return order.status ? (
    <>
      {/* =======modal====== */}

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'insert necessary information'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              valid check bank sleep and paid amount
              <form>
                <Grid container spacing={7}>
                  <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ImgStyled src={viewRP} alt='Profile Pic' />
                      <Box>
                        <ButtonStyled className='pbeth' component='label' variant='contained' htmlFor='upload-imgPaid'>
                          Upload payment document
                          <input
                            hidden
                            type='file'
                            onChange={onImgPaidChange}
                            accept='image/png, image/jpeg'
                            id='upload-imgPaid'
                          />
                        </ButtonStyled>
                        {/* <br />
                        <br />
                        <Button variant='contained' sx={{ marginRight: 3.5, bgcolor: 'green' }} onClick={uploadFiles}>
                          Save Changes
                        </Button> */}
                        <br />
                        <br />

                        <ResetButtonStyled
                          color='error'
                          variant='outlined'
                          onClick={() => setImgPaid('/images/PBETH/pbethLogo.png')}
                        >
                          Reset
                        </ResetButtonStyled>
                        <Typography variant='body2' sx={{ marginTop: 5 }}>
                          Allowed PNG or JPEG. Max size of 800K.
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Amount'
                      placeholder={user.name}
                      defaultValue={order.totalPrice + order.totalPrice * 0.05}
                      type='number'
                      name='paidAmount'
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <br />
            <br />
            <Button variant='contained' sx={{ marginRight: 3.5, bgcolor: 'green' }} onClick={uploadFiles}>
              Save Changes
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
            {/* <Button onClick={handleClose} autoFocus>
              Confirm
            </Button> */}
          </DialogActions>
        </Dialog>

        {/* =======confirmation alert====== */}
        <Dialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby='alert-confirm-title'
          aria-describedby='alert-confirm-description'
        >
          <DialogTitle id='alert-confirm-title'>{'Are You sure you want to confirm?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-confirm-description'>
              Once you have confirm this action it can not be undo! male sure you are correct
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>

            {visible && roles === 'credit_manager' && order.status === 'PENDING' && (
              <Button onClick={handleReject} autoFocus>
                Confirm
              </Button>
            )}

            {visible2 && roles === 'credit_manager' && order.status === 'PENDING' && (
              <Button onClick={handleAccept} autoFocus>
                Confirm
              </Button>
            )}

            {roles === 'credit_manager' && order.status === 'ACCEPTED' && order.status === 'PROCESSED' && (
              <Button onClick={handlePaid} autoFocus>
                Confirm
              </Button>
            )}
            {order.status === 'ACCEPTED' && roles === 'warehouse_manager' && (
              <Button onClick={handleProcessed} autoFocus>
                Confirm
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* =======confirmation alert====== */}
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
                  <div className='tm_f50 tm_text_uppercase tm_white_color'>Invoice</div>
                </div>
                <div className='tm_shape_bg tm_accent_bg tm_mobile_hide'></div>
              </div>
              <div className='tm_invoice_info tm_mb25'>
                {!eorder && (
                  <div className='tm_card_note tm_mobile_hide'>
                    <b className='tm_primary_color'>Payment Status: </b>
                    <Chip
                      label={order.status}
                      color={statusObj[order.status].color}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </div>
                )}
                {eorder && (
                  <div className='tm_card_note tm_mobile_hide'>
                    <b className='tm_primary_color'>Insoice Status: </b>
                    <Chip
                      label='VOIDED'
                      color={statusObj.REJECTED.color}
                      sx={{
                        height: 24,
                        fontSize: '1.5rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </div>
                )}
                <div className='tm_invoice_info_list tm_white_color'>
                  <p className='tm_invoice_number tm_m0'>
                    Invoice No: <b>{order._id}</b>
                  </p>
                  <p className='tm_invoice_date tm_m0'>
                    Date: <b>{order.createdAt.slice(0, 10)}</b>
                  </p>
                </div>
                <div className='tm_invoice_seperator tm_accent_bg'></div>
              </div>
              <div className='tm_invoice_head tm_mb10'>
                <div className='tm_invoice_left'>
                  <p className='tm_mb2'>
                    <b className='tm_primary_color'>Invoice To: {user.name}</b>
                  </p>
                  <p>
                    Client <br />
                    Somewhere, Addis Abeba <br />
                    Ethiopia <br />
                    {user.email}
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
                        {order.orderItems !== null ? (
                          order.orderItems.map((item, key) => (
                            <tr key={key}>
                              <td key={item._id} className='tm_width_3'>
                                {item.name}
                              </td>
                              {/* <td key={item._id} className='tm_width_4'>
                                {item.price}
                              </td> */}
                              <td key={item._id} className='tm_width_2'>
                                {item.price}
                              </td>
                              <td className='tm_width_1'>{item.quantity}</td>
                              <td className='tm_width_2 tm_text_right'>{item.quantity * item.price} ETB</td>
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
                    <p className='tm_m0'>Amount: {order.totalPrice} ETB</p>
                  </div>
                  <div className='tm_right_footer'>
                    <table className='tm_mb15'>
                      <tbody>
                        <tr className='tm_gray_bg '>
                          <td className='tm_width_3 tm_primary_color tm_bold'>Subtoal</td>
                          <td className='tm_width_3 tm_primary_color tm_bold tm_text_right'>{order.totalPrice} ETB</td>
                        </tr>
                        <tr className='tm_gray_bg'>
                          <td className='tm_width_3 tm_primary_color'>
                            Tax <span className='tm_ternary_color'>(5%)</span>
                          </td>
                          <td className='tm_width_3 tm_primary_color tm_text_right'>
                            {(order.totalPrice * 0.05).toFixed(2)} ETB
                          </td>
                        </tr>
                        <tr className='tm_accent_bg'>
                          <td className='tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color'>Grand Total </td>
                          <td className='tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color tm_text_right'>
                            {order.totalPrice + order.totalPrice * 0.05} ETB
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
                      <p className='tm_m0 tm_ternary_color'>{name}</p>
                      <p className='tm_m0 tm_f16 tm_primary_color'>{roles}</p>
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
                  All claims relating to quantity or shipping errors shall be waived by Buyer unless made in writing to{' '}
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
            <Box>
              <Grid container>
                {roles === 'credit_manager' &&
                  order.status !== 'REJECTED' &&
                  order.status !== 'ACCEPTED' &&
                  order.status !== 'PAID' &&
                  !eorder && (
                    <Button
                      className='tm_invoice_btn tm_color2'
                      style={{ color: 'black', width: '100%' }}
                      onClick={() => {
                        handleOpenConfirm()
                        changer2()
                      }}
                    >
                      Accept <span className='tm_btn_text'>Accept</span>
                    </Button>
                  )}
                {roles === 'credit_manager' &&
                  order.status !== 'REJECTED' &&
                  order.status !== 'ACCEPTED' &&
                  order.status !== 'PAID' &&
                  !eorder && (
                    <Button
                      className='tm_invoice_btn tm_color4'
                      style={{ color: 'black', width: '100%' }}
                      onClick={() => {
                        handleOpenConfirm()
                        changer()
                      }}
                    >
                      Reject <span className='tm_btn_text'>Reject</span>
                    </Button>
                  )}
                {!eorder && (
                  <Button
                    className='tm_invoice_btn tm_color3'
                    style={{ color: 'black', width: '100%' }}
                    onClick={handleComment}
                  >
                    comment<span className='tm_btn_text'>comment</span>
                  </Button>
                )}

                {roles === 'customer' && !eorder && (
                  <Button
                    className='tm_invoice_btn tm_color2'
                    style={{ color: 'black', width: '100%' }}
                    onClick={handleOpenConfirm}
                  >
                    Delivered<span className='tm_btn_text'>Delivered</span>
                  </Button>
                )}
                {/* {roles === 'customer' && (
                  <Link href='/comment'>
                    <Button
                      className='tm_invoice_btn tm_color2'
                      style={{ color: 'black', width: '100%' }}
                      
                    >
                      Return<span className='tm_btn_text'>Return</span>
                    </Button>
                  </Link>
                )} */}
                {roles === 'credit_manager' &&
                  order.status !== 'REJECTED' &&
                  order.status !== 'PENDING' &&
                  order.status !== 'PAID' &&
                  !eorder && (
                    <Button
                      onClick={handleClickOpen}
                      className='tm_invoice_btn tm_color2'
                      style={{ color: 'black', width: '100%' }}
                    >
                      Paid<span className='tm_btn_text'>Paid</span>
                    </Button>
                  )}
                {roles === 'warehouse_manager' && order.status !== 'REJECTED' && !eorder && order.status !== 'PAID' && (
                  <Button
                    className='tm_invoice_btn tm_color2'
                    style={{ color: 'black', width: '100%' }}
                    onClick={handleOpenConfirm}
                  >
                    Process<span className='tm_btn_text'>Process</span>
                  </Button>
                )}
                {roles === 'warehouse_manager' && !eorder && order.status !== 'PAID' && (
                  <Button
                    className='tm_invoice_btn tm_color2'
                    style={{ color: 'black', width: '100%' }}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
              </Grid>
            </Box>
          </div>
        </div>
      </div>
      {order.status === 'REJECTED' ||
        (order.status === 'PAID' && (
          <>
            <CheckIfPaid />
          </>
        ))}
      {/* <EditedInvoice /> */}

      {eorder && (
        <>
          {/* =======modal====== */}

          <React.Fragment>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>{'insert necessary information'}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  valid check bank sleep and paid amount
                  <form>
                    <Grid container spacing={7}>
                      <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ImgStyled src={viewRP} alt='Profile Pic' />
                          <Box>
                            <ButtonStyled
                              className='pbeth'
                              component='label'
                              variant='contained'
                              htmlFor='upload-imgPaid'
                            >
                              Upload payment document
                              <input
                                hidden
                                type='file'
                                onChange={onImgPaidChange}
                                accept='image/png, image/jpeg'
                                id='upload-imgPaid'
                              />
                            </ButtonStyled>
                            {/* <br />
                        <br />
                        <Button variant='contained' sx={{ marginRight: 3.5, bgcolor: 'green' }} onClick={uploadFiles}>
                          Save Changes
                        </Button> */}
                            <br />
                            <br />

                            <ResetButtonStyled
                              color='error'
                              variant='outlined'
                              onClick={() => setImgPaid('/images/PBETH/pbethLogo.png')}
                            >
                              Reset
                            </ResetButtonStyled>
                            <Typography variant='body2' sx={{ marginTop: 5 }}>
                              Allowed PNG or JPEG. Max size of 800K.
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Amount'
                          placeholder={user.name}
                          defaultValue={order.totalPrice + order.totalPrice * 0.05}
                          type='number'
                          name='paidAmount'
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </form>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <br />
                <br />
                <Button variant='contained' sx={{ marginRight: 3.5, bgcolor: 'green' }} onClick={uploadFiles}>
                  Save Changes
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
                {/* <Button onClick={handleClose} autoFocus>
              Confirm
            </Button> */}
              </DialogActions>
            </Dialog>

            {/* =======confirmation alert====== */}
            <Dialog
              open={openConfirm}
              onClose={handleCloseConfirm}
              aria-labelledby='alert-confirm-title'
              aria-describedby='alert-confirm-description'
            >
              <DialogTitle id='alert-confirm-title'>{'Are You sure you want to confirm?'}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-confirm-description'>
                  Once you have confirm this action it can not be undo! male sure you are correct
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseConfirm}>Cancel</Button>

                {visible && roles === 'credit_manager' && order.status === 'PENDING' && (
                  <Button onClick={handleReject} autoFocus>
                    Confirm
                  </Button>
                )}

                {visible2 && roles === 'credit_manager' && order.status === 'PENDING' && (
                  <Button onClick={handleAccept} autoFocus>
                    Confirm
                  </Button>
                )}

                {roles === 'credit_manager' && order.status === 'ACCEPTED' && order.status === 'PROCESSED' && (
                  <Button onClick={handlePaid} autoFocus>
                    Confirm
                  </Button>
                )}
                {order.status === 'ACCEPTED' && roles === 'warehouse_manager' && (
                  <Button onClick={handleProcessed} autoFocus>
                    Confirm
                  </Button>
                )}
              </DialogActions>
            </Dialog>

            {/* =======confirmation alert====== */}
          </React.Fragment>

          {/* =======modal====== */}
          <div className='tm_container html' style={{ paddingRight: '10rem' }}>
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
                      <div className='tm_f50 tm_text_uppercase tm_white_color'>Invoice</div>
                    </div>
                    <div className='tm_shape_bg tm_accent_bg tm_mobile_hide'></div>
                  </div>
                  <div className='tm_invoice_info tm_mb25'>
                    <div className='tm_card_note tm_mobile_hide'>
                      <b className='tm_primary_color'>Payment Status: </b>
                      <Chip
                        label={eorder.status}
                        color={statusObj[order.status].color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </div>
                    <div className='tm_invoice_info_list tm_white_color'>
                      <p className='tm_invoice_number tm_m0'>
                        Invoice No: <b>{eorder._id}</b>
                      </p>
                      <p className='tm_invoice_date tm_m0'>
                        Date: <b>{eorder.createdAt}</b>
                      </p>
                    </div>
                    <div className='tm_invoice_seperator tm_accent_bg'></div>
                  </div>
                  <div className='tm_invoice_head tm_mb10'>
                    <div className='tm_invoice_left'>
                      <p className='tm_mb2'>
                        <b className='tm_primary_color'>Invoice To: {eorder.userName}</b>
                      </p>
                      <p>
                        Client <br />
                        Somewhere, Addis Abeba <br />
                        Ethiopia <br />
                        {eorder.userEmail}
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
                          {/* orderItems */}
                          <tbody>
                            {order.orderItems !== null ? (
                              order.orderItems.map((item, key) => (
                                <tr key={key}>
                                  <td key={item._id} className='tm_width_3'>
                                    {item.name}
                                  </td>
                                  {/* <td key={item._id} className='tm_width_4'>
                                {item.price}
                              </td> */}
                                  <td key={item._id} className='tm_width_2'>
                                    {item.price}
                                  </td>
                                  <td className='tm_width_1'>{item.quantity}</td>
                                  <td className='tm_width_2 tm_text_right'>{item.quantity * item.price} ETB</td>
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
                        <p className='tm_m0'>
                          {/* Credit Card - 236***********928 <br /> */}
                          Amount: {eorder.totalPrice} ETB
                        </p>
                      </div>
                      <div className='tm_right_footer'>
                        <table className='tm_mb15'>
                          <tbody>
                            <tr className='tm_gray_bg '>
                              <td className='tm_width_3 tm_primary_color tm_bold'>Subtoal</td>
                              <td className='tm_width_3 tm_primary_color tm_bold tm_text_right'>
                                {eorder.totalPrice} ETB
                              </td>
                            </tr>
                            <tr className='tm_gray_bg'>
                              <td className='tm_width_3 tm_primary_color'>
                                Tax <span className='tm_ternary_color'>(5%)</span>
                              </td>
                              <td className='tm_width_3 tm_primary_color tm_text_right'>
                                {(eorder.totalPrice * 0.05).toFixed(2)} ETB
                              </td>
                            </tr>
                            <tr className='tm_accent_bg'>
                              <td className='tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color'>Grand Total </td>
                              <td className='tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color tm_text_right'>
                                {(eorder.totalPrice + eorder.totalPrice * 0.05).toFixed(2)} ETB
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
                          <p className='tm_m0 tm_ternary_color'>{name}</p>
                          <p className='tm_m0 tm_f16 tm_primary_color'>{roles}</p>
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
                      All claims relating to quantity or shipping errors shall be waived by Buyer unless made in writing
                      to <br />
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
                <Box>
                  <Grid container>
                    {roles === 'credit_manager' && !eorder && (
                      <Button
                        className='tm_invoice_btn tm_color2'
                        style={{ color: 'black', width: '100%' }}
                        onClick={() => {
                          handleOpenConfirm()
                          changer2()
                        }}
                      >
                        Accept <span className='tm_btn_text'>Accept</span>
                      </Button>
                    )}
                    {roles === 'credit_manager' && !eorder && (
                      <Button
                        className='tm_invoice_btn tm_color4'
                        style={{ color: 'black', width: '100%' }}
                        onClick={() => {
                          handleOpenConfirm()
                          changer()
                        }}
                      >
                        Reject <span className='tm_btn_text'>Reject</span>
                      </Button>
                    )}
                    <Link href='/comment'>
                      <Button
                        className='tm_invoice_btn tm_color3'
                        style={{ color: 'black', width: '100%' }}
                        onClick={handleComment}
                      >
                        comment<span className='tm_btn_text'>comment</span>
                      </Button>
                    </Link>
                    {roles === 'customer' && (
                      <Button
                        className='tm_invoice_btn tm_color2'
                        style={{ color: 'black', width: '100%' }}
                        onClick={handleOpenConfirm}
                      >
                        Delivered<span className='tm_btn_text'>Delivered</span>
                      </Button>
                    )}

                    {roles === 'credit_manager' &&
                      eorder.status !== 'REJECTED' &&
                      eorder.status !== 'PENDING' &&
                      eorder.status !== 'PAID' && (
                        <Button
                          onClick={handleClickOpen}
                          className='tm_invoice_btn tm_color2'
                          style={{ color: 'black', width: '100%' }}
                        >
                          Paid<span className='tm_btn_text'>Paid</span>
                        </Button>
                      )}
                    {roles === 'warehouse_manager' && eorder.status !== 'REJECTED' && eorder.status !== 'PENDING' && (
                      <Button
                        className='tm_invoice_btn tm_color2'
                        style={{ color: 'black', width: '100%' }}
                        onClick={handleOpenConfirm}
                      >
                        Process<span className='tm_btn_text'>Process</span>
                      </Button>
                    )}
                  </Grid>
                </Box>
              </div>
            </div>
          </div>
          {eorder.status === 'REJECTED' ||
            (eorder.status === 'PAID' && (
              <>
                <CheckIfPaid />
              </>
            ))}
        </>
      )}
    </>
  ) : (
    <>No Invoice Selected ...</>
  )
}

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Rowing } from 'mdi-material-ui'
import { RouteRounded } from '@mui/icons-material'

// invoice.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Invoice
