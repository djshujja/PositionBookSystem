import React, { useMemo, useState } from "react";
import {
  Container,
  Typography,
  GridLegacy as Grid,
  Paper,
  IconButton,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { postTrade } from "../store/tradeSlicer";
import type { FormRow, ValidCancelableEvent, TradeEvent } from "../types";
import ActionSegment from "../components/ActionSegment";
import BuySellFields from "../components/BuySellFields";
import CancelFields from "../components/CancelFields";
import ConfirmDialog from "../components/ConfirmDialog";
import { validateRows } from "../utils/validation";

export default function EventPage() {
  const dispatch = useAppDispatch();
  const positions = useAppSelector((s) => s.trades.positions);

  const validCancelableEvents = useMemo<ValidCancelableEvent[]>(() => {
    const all = positions.flatMap((pos) =>
      (pos.events || []).map((e) => ({
        ...e,
        account: pos.account,
        security: pos.security,
      }))
    );
    const canceled = new Set(
      all.filter((e) => e.action === "CANCEL").map((e) => e.id!)
    );
    return all
      .filter(
        (e) =>
          (e.action === "BUY" || e.action === "SELL") &&
          e.id != null &&
          !canceled.has(e.id)
      )
      .filter((e): e is ValidCancelableEvent => e.id != null);
  }, [positions]);

  const [rows, setRows] = useState<FormRow[]>([
    {
      key: 0,
      action: "BUY",
      account: "",
      security: "",
      quantity: 0,
      cancelId: null,
    },
  ]);
  const [nextKey, setNextKey] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [snack, setSnack] = useState<{
    open: boolean;
    msg: string;
    sev: "success" | "error";
  }>({ open: false, msg: "", sev: "success" });

  const addRow = () => {
    setRows((r) => [
      ...r,
      {
        key: nextKey,
        action: "BUY",
        account: "",
        security: "",
        quantity: 0,
        cancelId: null,
      },
    ]);
    setNextKey((k) => k + 1);
  };
  const updateRow = (key: number, changes: Partial<FormRow>) =>
    setRows((r) =>
      r.map((row) => (row.key === key ? { ...row, ...changes } : row))
    );
  const removeRow = (key: number) =>
    setRows((r) => r.filter((row) => row.key !== key));

  const handlePreview = () => {
    const err = validateRows(rows);
    if (err) {
      setSnack({ open: true, msg: err, sev: "error" });
      return;
    }
    setPreviewOpen(true);
  };

  const handleConfirm = async () => {
    setPreviewOpen(false);
    const payload: TradeEvent[] = rows.map((row) =>
      row.action === "CANCEL"
        ? {
            id: row.cancelId!,
            uid: undefined,
            action: "CANCEL",
            account: row.account,
            security: row.security,
            quantity:
              validCancelableEvents.find((e) => e.id === row.cancelId)
                ?.quantity ?? 0,
          }
        : {
            id: null,
            uid: undefined,
            action: row.action,
            account: row.account,
            security: row.security,
            quantity: row.quantity,
          }
    );
    try {
      await dispatch(postTrade({ events: payload })).unwrap();
      setSnack({ open: true, msg: "Events submitted!", sev: "success" });
      setRows([
        {
          key: nextKey,
          action: "BUY",
          account: "",
          security: "",
          quantity: 0,
          cancelId: null,
        },
      ]);
      setNextKey((k) => k + 1);
    } catch (err: any) {
      setSnack({ open: true, msg: err || "Submission failed", sev: "error" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mb: 3 }}>
        Create Trade Events
      </Typography>
      <Grid container spacing={2}>
        {rows.map((row) => (
          <Grid item xs={12} key={row.key}>
            <Paper variant="outlined" sx={{ position: "relative", p: 2 }}>
              <IconButton
                size="small"
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={() => removeRow(row.key)}
              >
                <Delete fontSize="small" />
              </IconButton>
              <ActionSegment
                value={row.action}
                onChange={(action) => {
                  if (action === "CANCEL") {
                    updateRow(row.key, {
                      action,
                      account: "",
                      security: "",
                      quantity: 0,
                      cancelId: null,
                    });
                  } else {
                    updateRow(row.key, { action, cancelId: null });
                  }
                }}
              />
              <Box sx={{ mt: 2 }}>
                {row.action !== "CANCEL" ? (
                  <BuySellFields
                    row={row}
                    onChange={(c) => updateRow(row.key, c)}
                  />
                ) : (
                  <CancelFields
                    row={row}
                    validEvents={validCancelableEvents}
                    onChange={(c) => updateRow(row.key, c)}
                  />
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="outlined" startIcon={<Add />} onClick={addRow}>
          Add Event
        </Button>
        <Button
          variant="contained"
          onClick={handlePreview}
          disabled={!rows.length}
        >
          Preview & Confirm
        </Button>
      </Box>
      <ConfirmDialog
        open={previewOpen}
        rows={rows}
        validEvents={validCancelableEvents}
        onClose={() => setPreviewOpen(false)}
        onConfirm={handleConfirm}
      />
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.sev}
          sx={{ width: "100%" }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
