import React from "react";
import { useAppSelector } from "../store/hooks";
import PositionTable from "../components/PositionTable";
import { CircularProgress, Snackbar } from "@mui/material";

export default function PositionPage() {
  const { positions, loading, error } = useAppSelector((state) => state.trades);

  return (
    <>
      {loading ? <CircularProgress /> : <PositionTable positions={positions} />}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        message={error || ""}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
