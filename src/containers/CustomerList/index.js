import { Box, Grid } from "@mui/material";
import { Fab, Action } from "react-tiny-fab";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../NavBar";
import axios from "axios";
import CustomerListComp from "../../components/CustomerList";
import AddCustomerComp from "../../components/AddCustomer";
import { BACKEND_URL } from "../../config";

const CustomerList = (props) => {
  const [customerData, setCustomerData] = useState([]);
  const [deleteRes, setDeleteRes] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { userInfo } = props;
  const fetchCustomer = () => {
    const getCustomerAPI = `${BACKEND_URL}/fetchCustomer?userID=${userInfo.email}`;

    axios
      .get(getCustomerAPI)
      .then((response) => {
        setCustomerData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleDelete = (email) => {
    axios
      .get(`${BACKEND_URL}/deleteCustomer?email=${email}`)
      .then((response) => {
        setDeleteRes(response.data.body);
        if (response.data.body === "success") {
          fetchCustomer(); // reload data after deleting customer
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar userInfo={userInfo} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <SideBar />
      </Grid>
      <Grid item xs={12} lg={9}>
        <Box pl={2} pr={4}>
          <CustomerListComp data={customerData} handleDelete={handleDelete} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <AddCustomerComp
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          userInfo={userInfo}
        />
      </Grid>
      <Fab
        // sx={{ position: "fixed", bottom: "50px", right: "20px" }}
        // size="small"
        // color="primary"
        // aria-label="add"
        mainButtonStyles={{ backgroundColor: "#3fb551" }}
        color="primary"
        icon={<AddIcon />}
        alwaysShowTitle={true}
      >
        <Action text="New customer" onClick={handleClickOpen}>
          <PersonAddIcon />
        </Action>
      </Fab>
    </Grid>
  );
};

export default CustomerList;
