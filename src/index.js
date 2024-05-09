import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import Detail from 'layouts/Certeficate';
import Invoice from 'layouts/invoice'
import Invoicess from 'layouts/Invoicess';
import { ChakraProvider } from '@chakra-ui/react';
import Otp from 'layouts/otp';
import forgetPassword from 'layouts/forgetPassword';
import resetPassword from 'layouts/resetPassword';
import updatePassword from 'layouts/updatePassword';

import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Higher-order component (HOC) for protected routes
const ProtectedRoute = ({ component: Component, allowSignIn = false, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() || allowSignIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth/sign-in" />
      )
    }
  />
);





ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/auth" component={AuthLayout} allowSignIn={true} />
            <ProtectedRoute path="/admin" component={AdminLayout} />
            <ProtectedRoute path="/rtl" component={RtlLayout} />
            <ProtectedRoute path="/detail" component={Detail} />
            <ProtectedRoute path="/invoice" component={Invoice} />
            <ProtectedRoute  path="/invoicess" component={Invoicess} />
           
            <ProtectedRoute path="/auth" component={Otp} allowSignIn={true} />
            <ProtectedRoute path="/auth" component={forgetPassword} allowSignIn={true}/>
            <ProtectedRoute path="/auth/resetPassword/:id/:token" component={resetPassword}   allowSignIn={true}/>
            <ProtectedRoute path="/auth/updatePassword/:token" component={updatePassword}   allowSignIn={true}/>
            <Redirect from="/" to="/auth/sign-in" />
          </Switch>
        </BrowserRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);


