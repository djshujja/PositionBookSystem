// src/pages/PositionPage.tsx
import React from "react";
import { useAppSelector } from "../store/hooks";
import PositionTable from "../components/PositionTable";
import { CircularProgress, Snackbar, Typography, Box } from "@mui/material";

export default function PositionPage() {
  const { positions, loading, error } = useAppSelector((s) => s.trades);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {positions.length === 0 ? (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            No positions yet
          </Typography>
        </Box>
      ) : (
        <PositionTable positions={positions} />
      )}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        message={error || ""}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
