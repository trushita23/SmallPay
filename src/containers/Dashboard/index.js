import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import NavBar from "../../containers/NavBar";
import moment from "moment";

import Box from "@mui/material/Box";
import SideBar from "../../components/SideBar";
import DashboardComp from "../../components/Dashboard";
import axios from "axios";
import Charts from "../Charts";
import { Fab, Action } from "react-tiny-fab";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";

import AddCustomerComp from "../../components/AddCustomer";
import { BACKEND_URL } from "../../config";
const dataReport = {
  paymentReceived: 0,
  pendingAmount: 0,
  overdue: 0,
  totalInvoices: 0,
  unpaidInvoices: 0,
  totalAmount: 0,
  paidInvoices: 0,
};
const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { userInfo } = props;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const api = `${BACKEND_URL}/fetchInvoice?userID=${userInfo.email}`;
    axios
      .get(api)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const paidStatus_count = (type) => {
    let count = 0;
    data.forEach((item) => {
      if (item.payment_status.toLowerCase() === type) count++;
    });
    return count;
  };

  const total_payment = () => {
    let totalPayments = 0;
    data.forEach((item) => {
      if (item.payment_status.toLowerCase() === "paid")
        totalPayments = totalPayments + item.total;
    });

    return totalPayments;
  };

  const cal_total_amt = () => {
    let totalAmt = 0;
    data.forEach((item) => {
      totalAmt = totalAmt + item.total;
    });

    return totalAmt;
  };

  const cal_overdue = () => {
    let overdue = 0;
    const currentDate = moment(Date.now()).format("yyyy-MM-DD");

    data.forEach((item) => {
      if (item.payment_status.toLowerCase() === "unpaid") {
        const dueDate = moment(item.dueDate).format("yyyy-MM-DD");
        if (moment(currentDate).isAfter(dueDate))
          overdue = overdue + item.total;
      }
    });

    return overdue;
  };

  const cal_pendingAmt = () => {
    let pendingAmount = 0;
    const currentDate = moment(Date.now()).format("yyyy-MM-DD");

    data.forEach((item) => {
      if (item.payment_status.toLowerCase() === "unpaid") {
        const dueDate = moment(item.dueDate).format("yyyy-MM-DD");
        if (moment(currentDate).isBefore(dueDate))
          pendingAmount = pendingAmount + item.total;
      }
    });

    return pendingAmount;
  };

  if (data.length !== 0) {
    dataReport.totalInvoices = data.length;
    dataReport.unpaidInvoices = paidStatus_count("unpaid");
    dataReport.paidInvoices = paidStatus_count("paid");
    dataReport.paymentReceived = total_payment();
    dataReport.totalAmount = cal_total_amt();
    dataReport.pendingAmount = cal_pendingAmt();
    dataReport.overdue = cal_overdue();
  }

  return (
    <>
      <NavBar userInfo={userInfo} />

      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" minHeight="100vh">
            {/* Sidebar */}
            <Box
              sx={{
                width: { xs: "100%", lg: "25%" },
                bgcolor: "#f5f5f5",
                minHeight: "100vh",
              }}
            >
              <SideBar />
            </Box>

            {/* Main Content: Dashboard + Charts */}
            <Box
              sx={{
                flexGrow: 1,
                p: 2,
                width: { xs: "100%", lg: "75%" },
              }}
            >
              <DashboardComp data={dataReport} />
              <Box mt={4}>
                <Charts data={data} />
              </Box>
            </Box>
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
      </Grid>

      <Fab
        mainButtonStyles={{ backgroundColor: "#3fb551" }}
        color="primary"
        icon={<AddIcon />}
        alwaysShowTitle={true}
      >
        <Action text="New customer" onClick={handleClickOpen}>
          <PersonAddIcon />
        </Action>
      </Fab>
    </>
  );
};

export default Dashboard;
