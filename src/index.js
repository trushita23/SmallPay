import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import OidcProviderWrapper from "./config/OidcProviderWrapper";

ReactDOM.render(
  <OidcProviderWrapper>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </OidcProviderWrapper>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
