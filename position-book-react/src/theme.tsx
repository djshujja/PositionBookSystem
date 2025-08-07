// Centralized theme configuration
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0", // deep blue
      light: "#5e92f3",
      dark: "#003c8f",
    },
    secondary: {
      main: "#9c27b0", // purple
      light: "#d05ce3",
      dark: "#6a0080",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#ed6c02",
    },
    success: {
      main: "#2e7d32",
    },
    info: {
      main: "#0288d1",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h5: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  spacing: 8, // 1 unit = 8px
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body { background-color: #f4f6f8; }
      `,
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3,
      },
    },
  },
});

export default theme;
