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

reportWebVitals();
