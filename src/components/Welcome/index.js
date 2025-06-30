import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Link,
} from "@mui/material";
import logo from "../../images/smallpay-logo.png";
import product from "../../images/dashboard.png";
import invoicePreview from "../../images/invoice-preview.png";
import { useAuth } from "react-oidc-context";

function Welcome() {
  const auth = useAuth();

  return (
    <Box sx={{ backgroundColor: "#FDFCFB", maxHeight: "10vh" }}>
      {/* Logo Bar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: "#fcfcfc" }}>
        <Toolbar sx={{ minHeight: 56, justifyContent: "center" }}>
          <Box
            component="img"
            src={logo}
            alt="SmallPay Logo"
            sx={{ height: 150, width: "auto" }}
          />
        </Toolbar>
      </AppBar>

      {/* Adds top padding to clear AppBar */}
      <Box sx={{ pt: 2, pb: 6, backgroundColor: "#ffffff" }}>
        <Container
          maxWidth="lg"
          sx={{ bgcolor: "#ffffff", borderRadius: 2, py: 4 }}
        >
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={6} textAlign="center">
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Invoicing That Helps Small Businesses Get{" "}
                <Box component="span" sx={{ color: "#18ad68" }}>
                  Paid Faster!
                </Box>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" mb={3}>
                Helps business owners generate beautiful invoices, look
                professional, and get paid faster.
              </Typography>
              <Box mt={3}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ bgcolor: "#18ad68", px: 6, fontWeight:800, color: "#ffffff" }}
                  onClick={() => auth.signinRedirect()}
                >
                  Sign Up
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={product}
                alt="Dashboard Product"
                sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box sx={{ my: 8 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            See how your business is doing
          </Typography>
          <Typography variant="subtitle1" textAlign="center" mb={4}>
            Take advantage of the dashboard that add efficiency at every step by
            displaying useful reports to make better decision.
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Professional invoices with a personal touch
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Designed to be simple and help you get paid faster with custom
                tax calculations
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Update status of customers on receiving payment and our product
                maintains a good statistics on payment history.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={invoicePreview}
                alt="Invoice Preview"
                sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Workflow Section */}
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          gutterBottom
        >
          Always in step with your workflow
        </Typography>
        <Grid container spacing={4} mt={2} justifyContent="center">
          <Grid item xs={12} md="auto">
            <Paper sx={{ p: 3, maxWidth: 360 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Real-time insights. Fewer surprises.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Instantly track profits, losses, and customer payments—all from
                a single dashboard that keeps you informed at a glance.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md="auto">
            <Paper sx={{ p: 3, maxWidth: 365 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Invoices that remember your customers.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Add clients once and reuse their details effortlessly. Mark
                payments as received and share invoices with just a click.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 4, mt: 6 }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                © {new Date().getFullYear()} SmallPay. All rights reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Link href="#" color="inherit" sx={{ mr: 2 }}>
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" sx={{ mr: 2 }}>
                Terms
              </Link>
              <Link href="#" color="inherit">
                Twitter
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Welcome;
