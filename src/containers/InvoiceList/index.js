import { Box, Grid } from "@mui/material";
import { Fab, Action } from "react-tiny-fab";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import InvoiceListComp from "../../components/InvoiceList";
import SideBar from "../../components/SideBar";
import NavBar from "../NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AddCustomerComp from "../../components/AddCustomer";
import { BACKEND_URL } from "../../config";

const InvoiceList = (props) => {
  const { userInfo } = props;

  const [data, setData] = useState([]);
  const [deleteRes, setDeleteRes] = useState("");
  const [editRes, setEditRes] = useState("");
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    const api = `${BACKEND_URL}/fetchInvoice?userID=${userInfo.email}`;
    axios
      .get(api)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (invoiceNumber) => {
    axios
      .get(`${BACKEND_URL}/deleteInvoice?invoiceNumber=${invoiceNumber}`)
      .then((response) => {
        setDeleteRes(response.data.body);
        if (response.data.body === "success") {
          fetchData(); // reload data after deleting invoice
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (invoiceNumber) => {
    axios
      .get(`${BACKEND_URL}/editInvoice?invoiceNumber=${invoiceNumber}`)
      .then((response) => {
        setEditRes(response.data.data);
        if (response.data.data === "success") {
          fetchData(); // reload data after deleting invoice
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleViewInvoice = (invoiceNumber) => {
    history.push(`/readInvoice/${invoiceNumber}`);
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
          <InvoiceListComp
            data={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleViewInvoice={handleViewInvoice}
          />
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

export default InvoiceList;
