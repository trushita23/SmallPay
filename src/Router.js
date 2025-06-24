import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { CssBaseline } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useAuth } from "react-oidc-context";
import Callback from "./components/Callback";

//imports are lazy loaded for better performance and to reduce size of bundle.
const HomePage = React.lazy(() => import("./pages/HomePage"));
const SpecificInvoicePage = React.lazy(() =>
  import("./pages/SpecificInvoicePage")
);

const Dashboard = React.lazy(() => import("./containers/Dashboard"));
const Invoice = React.lazy(() => import("./containers/Invoice"));
const InvoiceList = React.lazy(() => import("./containers/InvoiceList"));
const CustomerList = React.lazy(() => import("./containers/CustomerList"));

function Router() {
  const auth = useAuth();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.profile?.email) {
      axios
        .get(`${BACKEND_URL}/fetchUser?username=${auth.user.profile.email}`)
        .then((res) => setUserInfo(res.data.data))
        .catch((err) => console.error("User fetch failed", err));
    }
  }, [auth.isAuthenticated]);

  if (auth.isLoading) return <Loader />;

  return (
    <BrowserRouter>
      <CssBaseline />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/callback" component={Callback} />

          {/* Public home/login */}
          <Route
            exact
            path="/"
            render={() =>
              auth.isAuthenticated ? (
                <HomePage />
              ) : (
                <button onClick={() => auth.signinRedirect()}>Login</button>
              )
            }
          />

          {/* Protected routes */}
          {auth.isAuthenticated && (
            <>
              <Route
                path="/dashboard"
                exact
                render={() => <Dashboard userInfo={userInfo} />}
              />
              <Route
                path="/invoice"
                exact
                render={() => <Invoice userInfo={userInfo} />}
              />
              <Route
                path="/invoiceList"
                exact
                render={() => <InvoiceList userInfo={userInfo} />}
              />
              <Route
                path="/readInvoice/:invoiceNumber"
                exact
                render={() => <SpecificInvoicePage userInfo={userInfo} />}
              />
              <Route
                path="/customers"
                exact
                render={() => <CustomerList userInfo={userInfo} />}
              />
            </>
          )}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
export default Router;
