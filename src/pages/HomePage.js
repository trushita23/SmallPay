import React from "react";
import { Grid } from "@mui/material";
import NavBar from "../containers/NavBar";
import AddCustomer from "../containers/AddCustomer";
import SideBar from "../components/SideBar";
import { useAuth } from "react-oidc-context";

const HomePage = (props) => {
  const auth = useAuth();
  if (auth.isLoading) return <p>Loading...</p>;
  if (auth.error) return <p>Error: {auth.error.message}</p>;

  return auth.isAuthenticated ? (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NavBar userInfo={auth.user?.profile?.email} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <SideBar />
      </Grid>
      <Grid item xs={12}>
        <AddCustomer userInfo={auth.user?.profile?.email} />
      </Grid>
    </Grid>
  ) : (
    <button onClick={() => auth.signinRedirect()}>Login</button>
  );
};

export default HomePage;
