import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { postTrade } from "../store/tradeSlicer";
import type { TradeAction, TradeEvent, Position } from "../types";

interface CancelableEvent extends TradeEvent {
  account: string;
  security: string;
}

const EventPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const positions: Position[] = useAppSelector(
    (state) => state.trades.positions
  );
  const [action, setAction] = useState<TradeAction>("BUY");
  const [account, setAccount] = useState("");
  const [security, setSecurity] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success"
  );

  const allEvents: CancelableEvent[] = useMemo(
    () =>
      positions.flatMap((pos) =>
        (pos.events || []).map((e) => ({
          ...e,
          account: pos.account,
          security: pos.security,
        }))
      ),
    [positions]
  );

  const canceledIds = useMemo(
    () =>
      new Set(allEvents.filter((e) => e.action === "CANCEL").map((e) => e.id)),
    [allEvents]
  );

  const cancelableEvents = useMemo(
    () =>
      allEvents.filter(
        (e) =>
          (e.action === "BUY" || e.action === "SELL") && !canceledIds.has(e.id)
      ),
    [allEvents, canceledIds]
  );

  const accounts = useMemo(
    () => Array.from(new Set(cancelableEvents.map((e) => e.account))),
    [cancelableEvents]
  );

  const securities = useMemo(
    () =>
      Array.from(
        new Set(
          cancelableEvents
            .filter((e) => e.account === account)
            .map((e) => e.security)
        )
      ),
    [cancelableEvents, account]
  );

  const matchingEvents = useMemo(
    () =>
      cancelableEvents.filter(
        (e) => e.account === account && e.security === security
      ),
    [cancelableEvents, account, security]
  );

  // Helper to find current position quantity
  const availableQty = useMemo(() => {
    const pos = positions.find(
      (p) => p.account === account && p.security === security
    );
    return pos?.quantity ?? 0;
  }, [positions, account, security]);

  const handleSubmit = async () => {
    if (action === "SELL" && quantity > availableQty) {
      setSnackMsg(`Cannot sell ${quantity}; only ${availableQty} available.`);
      setSnackSeverity("error");
      setSnackOpen(true);
      return;
    }

    // Build payload
    const payload: TradeEvent =
      action === "CANCEL"
        ? {
            id: selectedEventId!,
            action,
            account,
            security,
            quantity: 0,
          }
        : {
            id: 0,
            action,
            account,
            security,
            quantity,
          };

    try {
      await dispatch(postTrade({ events: [payload] })).unwrap();
      setSnackMsg("Event submitted successfully!");
      setSnackSeverity("success");
      setSnackOpen(true);
      // reset form
      setAccount("");
      setSecurity("");
      setQuantity(0);
      setSelectedEventId(null);
    } catch (err: any) {
      setSnackMsg(err || "Submission failed");
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h5">Create Trade Event</Typography>

        <ToggleButtonGroup
          color="primary"
          value={action}
          exclusive
          onChange={(_, newAction) => {
            if (newAction) {
              setAction(newAction);
              setAccount("");
              setSecurity("");
              setQuantity(0);
              setSelectedEventId(null);
            }
          }}
        >
          <ToggleButton value="BUY">Buy</ToggleButton>
          <ToggleButton value="SELL">Sell</ToggleButton>
          <ToggleButton value="CANCEL">Cancel</ToggleButton>
        </ToggleButtonGroup>

        {action === "CANCEL" ? (
          <>
            <FormControl fullWidth>
              <InputLabel>Account</InputLabel>
              <Select
                value={account}
                label="Account"
                onChange={(e) => setAccount(e.target.value)}
              >
                {accounts.map((acc) => (
                  <MenuItem key={acc} value={acc}>
                    {acc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {account && (
              <FormControl fullWidth>
                <InputLabel>Security</InputLabel>
                <Select
                  value={security}
                  label="Security"
                  onChange={(e) => setSecurity(e.target.value)}
                >
                  {securities.map((sec) => (
                    <MenuItem key={sec} value={sec}>
                      {sec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {account && security && (
              <FormControl fullWidth>
                <InputLabel>Event to Cancel</InputLabel>
                <Select
                  value={selectedEventId ?? ""}
                  label="Event to Cancel"
                  onChange={(e) => setSelectedEventId(Number(e.target.value))}
                >
                  {matchingEvents.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      #{e.id} — {e.action} {e.quantity}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="Account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <TextField
              fullWidth
              label="Security"
              value={security}
              onChange={(e) => setSecurity(e.target.value)}
            />
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              error={action === "SELL" && quantity > availableQty}
              helperText={
                action === "SELL" && quantity > availableQty
                  ? `Max available to sell is ${availableQty}`
                  : ""
              }
            />
          </>
        )}

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            action === "CANCEL"
              ? !(account && security && selectedEventId !== null)
              : !(account && security && quantity > 0)
          }
        >
          Submit
        </Button>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EventPage;
