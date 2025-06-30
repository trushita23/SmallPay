import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#18ad68",
      light: "#c5e9ca",
    },
    secondary: {
      main: "#1876ad",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: "#eeeeee",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: { color: "#ffffff" },
        h2: { color: "#ffffff" },
        h3: { color: "#ffffff" }
      },
    },
  },
});

export default theme;
