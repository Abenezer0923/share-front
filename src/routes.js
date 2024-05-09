import React from "react";

import { Icon, layout } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdShare,
  MdHome,
  MdLock,
  MdKey,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/Transactions";
import RTL from "views/admin/rtl";
import What from "views/admin/what";
import Franchise from "views/admin/Franchise";
import Ordinary from "views/admin/Ordinary";
import Tsm from "views/admin/Tsm";
import Certeficate from "views/admin/Certeficate";
import Templete from "views/admin/Templete";
import SuccessPage from "views/admin/success";
import CancelPage from "views/admin/Cancel";
import Error from "views/admin/Error";
import Invoice from "views/admin/invoice"
import ForgetPassword from "views/auth/forgetPassword";
import CheakText from "views/auth/sendEmail";
import Invoices from "views/admin/Invoices"
// Auth Imports
import SignInCentered from "views/auth/signIn";
import Otp from "views/auth/otp"
import ResetPassword from "views/auth/resetPassword";
import UpdatePassword from "views/auth/updatePassword";


const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
 
  // {
  //   name: "Transactions",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Transactions",
    layout: "/admin",
    path: "/Transactions",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: DataTables,
    secondary: true,
  },
  {
    name: "What's New",
    layout: "/admin",
    path: "/what-is-new",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
    
  },
  {
    name: "Franchise",
    layout: "/admin",
    path: "/franchise",
    icon: <Icon as={MdKey} width="20px" height="20px" color="inherit" />,
    component: Franchise,
  },
  // {
  //   name: "Ordinary",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  {
    name: "Ordinary",
    layout: "/admin",
    path: "/ordinary",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Ordinary,
  },
  // {
  //   name: "Example",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  {
    name: "TSM",
    layout: "/admin",
    path: "/tsm",
    icon: <Icon as={MdShare} width="20px" height="20px" color="inherit" />,
    component: Tsm,
  },
  // {
  //   name: "whattt",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Certificate",
    layout: "/admin",
    path: "/certeficate",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Certeficate,
    secondary: true,
  },
  {
    name: "ResetPassword",
    layout:'/auth',
    path: "/resetPassword/:id/:token",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: ResetPassword,
  },
  {
    name: "Update Password",
    layout: "/auth",
    path: "/updatePassword",
    icon: <Icon as={MdKey} width="20px" height="20px" color="inherit" />,
    component: UpdatePassword,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },  
  {
    name: "ForgetPassword",
    layout:"/auth",
    path:"/forgetPassword",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: ForgetPassword,
 },
 {
  name: "CheakText",
  layout:"/auth",
  path:"/cheakEmail",
  icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  component: CheakText,
},
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Otp",
    layout: "/auth",
    path: "/otp",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: Otp,
  },

  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
  {
    layout: "/admin",
    path: "/templete",
    component: Templete,
    hidden: true,
  },
  {
    layout: "/admin",
    path: "/error",
    component: Error,
    hidden: true,
  },
  {
    layout: "/admin",
    path: "/success",
    component:  SuccessPage,
    hidden: true,
  },
  {
    layout:"/admin",
    path: "/cancel",
    component: CancelPage,
    hidden: true
  },
  {
    layout: "/admin",
    path: "/invoice",
    component: Invoice,
    hidden: true,
  },{
    layout: "/admin",
    path: "/invoicess",
    component: Invoices,
    hidden: true,
  },

];


const invoiceRoute = routes.find((route) => route.component === Invoice);

if (invoiceRoute) {
  const invoicePath = invoiceRoute.path;
  console.log("Invoice Path:", invoicePath);
} else {
  console.log("Invoice component not found in routes.");
}
export default routes;
