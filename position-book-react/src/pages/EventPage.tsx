import React, { useMemo, useState } from "react";
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
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { postTrade } from "../store/tradeSlicer";
import { TradeAction, TradeEvent, Position } from "../types";

// Extend TradeEvent with account + security
interface CancelableEvent extends TradeEvent {
  account: string;
  security: string;
}

const EventPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const positions: Position[] = useAppSelector(
    (state) => state.trades.positions
  ); // ✅ FIXED

  const [action, setAction] = useState<TradeAction>("BUY");
  const [account, setAccount] = useState("");
  const [security, setSecurity] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  // 🔁 Flatten all events with their parent account/security
  const allEvents: CancelableEvent[] = useMemo(() => {
    return positions.flatMap((pos: Position) =>
      (pos.events || []).map((event: TradeEvent) => ({
        ...event,
        account: pos.account,
        security: pos.security,
      }))
    );
  }, [positions]);

  // 🛑 Collect canceled event IDs
  const canceledIds = useMemo(() => {
    return new Set<number>(
      allEvents.filter((e) => e.action === "CANCEL").map((e) => e.id)
    );
  }, [allEvents]);

  // ✅ Filter only BUY/SELL events not already canceled
  const cancelableEvents: CancelableEvent[] = useMemo(() => {
    return allEvents.filter(
      (e) =>
        (e.action === "BUY" || e.action === "SELL") && !canceledIds.has(e.id)
    );
  }, [allEvents, canceledIds]);

  // 📌 Dropdown options
  const accounts = useMemo(() => {
    return Array.from(new Set(cancelableEvents.map((e) => e.account)));
  }, [cancelableEvents]);

  const securities = useMemo(() => {
    return Array.from(
      new Set(
        cancelableEvents
          .filter((e) => e.account === account)
          .map((e) => e.security)
      )
    );
  }, [cancelableEvents, account]);

  const matchingEvents = useMemo(() => {
    return cancelableEvents.filter(
      (e) => e.account === account && e.security === security
    );
  }, [cancelableEvents, account, security]);

  // 🚀 Submit trade (BUY, SELL, CANCEL)
  const handleSubmit = () => {
    const payload: TradeEvent =
      action === "CANCEL"
        ? {
            id: selectedEventId!,
            action: "CANCEL",
            account,
            security,
            quantity: 0,
          }
        : {
            id: 0, // placeholder, backend will assign
            action,
            account,
            security,
            quantity,
          };

    dispatch(postTrade({ events: [payload] }));

    // Reset form
    setAccount("");
    setSecurity("");
    setQuantity(0);
    setSelectedEventId(null);
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
              setSelectedEventId(null);
              setQuantity(0);
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
                label="Account"
                value={account}
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
                  label="Security"
                  value={security}
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
                  label="Event to Cancel"
                  value={selectedEventId ?? ""}
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
            />
          </>
        )}

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            action === "CANCEL"
              ? !(account && security && selectedEventId)
              : !(account && security && quantity > 0)
          }
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default EventPage;
