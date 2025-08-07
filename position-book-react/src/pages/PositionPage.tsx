import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPositions } from "../store/tradeSlicer";
import PositionTable from "../components/PositionTable";
import {
  CircularProgress,
  Snackbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function PositionPage() {
  const dispatch = useAppDispatch();
  const { positions, loading, error } = useAppSelector((s) => s.trades);

  const handleRefresh = () => {
    dispatch(fetchPositions());
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={loading}
        >
          Refresh Results
        </Button>
      </Box>

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
