// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ro from "rote";
import routes from "routes.js";

// Custom Chakra theme
export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // Function to filter out the Templete route
  const filteredRoutes = routes.filter((route) =>
  (route.layout === "/admin") &&
  route.path !== "/templete" &&
  route.path !== "/invoicess" &&
  route.path !== "/invoice"  

);

const filterRou = routes.filter((route) => (route.layout === "/admin") &&
(route.layout === "/admin") &&
route.path !== "/templete" &&
route.path !== "/invoicess" &&
route.path !== "/invoice" &&
route.path !==  "/error" &&
route.path !== "/success" &&
route.path !== "/cancel") 


  
  
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (filteredRoutes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < filteredRoutes.length; i++) {
      if (filteredRoutes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(filteredRoutes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (filteredRoutes[i].category) {
        let categoryActiveRoute = getActiveRoute(filteredRoutes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(filteredRoutes[i].layout + filteredRoutes[i].path) !== -1
        ) {
          return filteredRoutes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (filteredRoutes) => {
    let activeNavbar = false;
    for (let i = 0; i < filteredRoutes.length; i++) {
      if (filteredRoutes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(filteredRoutes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (filteredRoutes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(filteredRoutes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(filteredRoutes[i].layout + filteredRoutes[i].path) !== -1
        ) {
          return filteredRoutes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (filteredRoutes) => {
    let activeNavbar = false;
    for (let i = 0; i < filteredRoutes.length; i++) {
      if (filteredRoutes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(filteredRoutes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (filteredRoutes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(filteredRoutes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(filteredRoutes[i].layout + filteredRoutes[i].path) !== -1
        ) {
          return filteredRoutes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (filteredRoutes) => {
    return filteredRoutes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  document.documentElement.dir = "ltr";
  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <Sidebar routes={filterRou} display="none" {...rest} />
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: "100%", xl: "calc( 100% - 290px )" }}
            maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Portal>
              <Box>
                <Navbar
                  onOpen={onOpen}
                  logoText={"Purpose Black ETH"}
                  brandText={getActiveRoute(filteredRoutes)}
                  secondary={getActiveNavbar(filteredRoutes)}
                  message={getActiveNavbarText(filteredRoutes)}
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>

            {getRoute() ? (
              <Box mx="auto" p={{ base: "20px", md: "30px" }} pe="20px" minH="100vh" pt="50px">
                <Switch>
                  {filteredRoutes.map((prop, key) => {
                    return (
                      <Route path={prop.layout + prop.path} component={prop.component} key={key} />
                    );
                  })}
                  {/* Add a default redirect if no route matches */}
                 
                </Switch>
              </Box>
            ) : null}
            <Box>{/* <Footer /> */}</Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
}
