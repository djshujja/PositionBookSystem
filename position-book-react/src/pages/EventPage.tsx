import { useState } from "react";
import type { TradeAction, TradeEvent } from "../types";
import { useAppDispatch } from "../store/hooks";
import { postTrade } from "../store/tradeSlicer";
import {
  Box,
  Button,
  GridLegacy as Grid,
  Paper,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

let eventId = 1;

export default function EventPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<TradeEvent>>({
    action: "BUY",
  });

  const handleChange =
    (field: keyof TradeEvent) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [field]: field === "quantity" ? Number(e.target.value) : e.target.value,
      });
    };

  const handleSubmit = async () => {
    if (
      form.action &&
      form.account &&
      form.security &&
      form.quantity !== undefined
    ) {
      const trade: TradeEvent = {
        id: eventId++,
        action: form.action,
        account: form.account,
        security: form.security,
        quantity: form.quantity,
      };
      await dispatch(postTrade(trade));
      navigate("/positions");
    }
  };

  return (
    <Box>
      {/* Top Tabs */}
      <Tabs value={1} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tab label="Position Summary" onClick={() => navigate("/positions")} />
        <Tab label="Create Event" />
      </Tabs>

      {/* Main Grid Layout */}
      <Grid container height="calc(100vh - 64px)">
        {/* Left Panel Buttons */}
        <Grid item xs={2} sx={{ borderRight: "1px solid #ccc", p: 2 }}>
          {["Buy", "Sell", "Cancel"].map((action) => (
            <Button
              key={action}
              variant={
                form.action === action.toUpperCase() ? "contained" : "outlined"
              }
              fullWidth
              onClick={() =>
                setForm({
                  ...form,
                  action: action.toUpperCase() as TradeAction,
                })
              }
              sx={{ mb: 2 }}
            >
              {action}
            </Button>
          ))}
        </Grid>

        {/* Form Area */}
        <Grid item xs={10} p={4}>
          <Paper
            elevation={3}
            sx={{ p: 4, maxWidth: 600, mx: "auto", position: "relative" }}
          >
            <Typography variant="h6" mb={2}>
              FORM CONTENTS HERE
            </Typography>

            <TextField
              fullWidth
              label="Account"
              value={form.account || ""}
              onChange={handleChange("account")}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Security"
              value={form.security || ""}
              onChange={handleChange("security")}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={form.quantity || ""}
              onChange={handleChange("quantity")}
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
