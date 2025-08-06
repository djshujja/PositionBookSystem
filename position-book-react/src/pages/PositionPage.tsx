import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPositions } from "../store/tradeSlicer";
import PositionTable from "../components/PositionTable";
import { CircularProgress, Snackbar } from "@mui/material";

export default function PositionPage() {
  const dispatch = useAppDispatch();
  const { positions, loading, error } = useAppSelector((state) => state.trades);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  return (
    <>
      {loading ? <CircularProgress /> : <PositionTable positions={positions} />}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        message={error}
        onClose={() => {}}
      />
    </>
  );
}
