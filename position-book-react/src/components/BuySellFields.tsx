import React from "react";
import { TextField, Box } from "@mui/material";
import type { FormRow } from "../types";

interface Props {
  row: FormRow;
  onChange: (changes: Partial<FormRow>) => void;
}

const BuySellFields: React.FC<Props> = ({ row, onChange }) => (
  <Box display="flex" gap={2} flexWrap="wrap">
    <TextField
      label="Account"
      value={row.account}
      onChange={(e) => onChange({ account: e.target.value })}
      sx={{ flex: 1 }}
    />
    <TextField
      label="Security"
      value={row.security}
      onChange={(e) => onChange({ security: e.target.value })}
      sx={{ flex: 1 }}
    />
    <TextField
      label="Quantity"
      type="number"
      value={row.quantity}
      onChange={(e) => onChange({ quantity: Number(e.target.value) })}
      sx={{ width: 120 }}
    />
  </Box>
);

export default BuySellFields;
