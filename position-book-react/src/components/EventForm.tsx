import { useState } from "react";
import type { TradeEvent } from "../types";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";

interface Props {
  onSubmit: (event: TradeEvent) => void;
}

let eventId = 1;

export default function EventForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Partial<TradeEvent>>({ action: "BUY" });

  const handleChange =
    (field: keyof TradeEvent) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [field]: field === "quantity" ? Number(e.target.value) : e.target.value,
      });
    };

  const handleSubmit = () => {
    if (
      form.action &&
      form.account &&
      form.security &&
      form.quantity !== undefined
    ) {
      const event: TradeEvent = {
        id: eventId++,
        action: form.action,
        account: form.account,
        security: form.security,
        quantity: form.quantity,
      };
      onSubmit(event);
      setForm({ action: "BUY" });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mb={4}>
      <Typography variant="h6">Create Trade Event</Typography>
      <TextField
        label="Account"
        value={form.account || ""}
        onChange={handleChange("account")}
      />
      <TextField
        label="Security"
        value={form.security || ""}
        onChange={handleChange("security")}
      />
      <TextField
        label="Quantity"
        type="number"
        value={form.quantity || ""}
        onChange={handleChange("quantity")}
      />
      <TextField
        select
        label="Action"
        value={form.action || "BUY"}
        onChange={handleChange("action")}
      >
        {["BUY", "SELL", "CANCEL"].map((action) => (
          <MenuItem key={action} value={action}>
            {action}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
