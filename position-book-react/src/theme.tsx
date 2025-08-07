// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    primary: {
      main: "#1976d2",
    },
    divider: "#e0e0e0",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: { fontWeight: 500 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
  },
});

export default theme;
