import React, { useMemo } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import type { FormRow, ValidCancelableEvent } from "../types";

interface Props {
  row: FormRow;
  validEvents: ValidCancelableEvent[];
  onChange: (changes: Partial<FormRow>) => void;
}

const CancelFields: React.FC<Props> = ({ row, validEvents, onChange }) => {
  const accounts = useMemo(
    () => Array.from(new Set(validEvents.map((e) => e.account))),
    [validEvents]
  );

  const securities = useMemo(
    () =>
      row.account
        ? Array.from(
            new Set(
              validEvents
                .filter((e) => e.account === row.account)
                .map((e) => e.security)
            )
          )
        : [],
    [validEvents, row.account]
  );

  const events = useMemo(
    () =>
      row.account && row.security
        ? validEvents.filter(
            (e) => e.account === row.account && e.security === row.security
          )
        : [],
    [validEvents, row.account, row.security]
  );

  const selected = events.find((e) => e.id === row.cancelId);

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <FormControl sx={{ flex: 1, minWidth: 120 }}>
        <InputLabel>Account</InputLabel>
        <Select
          value={row.account}
          label="Account"
          onChange={(e) =>
            onChange({ account: e.target.value, security: "", cancelId: null })
          }
        >
          {accounts.map((acc) => (
            <MenuItem key={acc} value={acc}>
              {acc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {!!row.account && (
        <FormControl sx={{ flex: 1, minWidth: 120 }}>
          <InputLabel>Security</InputLabel>
          <Select
            value={row.security}
            label="Security"
            onChange={(e) =>
              onChange({ security: e.target.value, cancelId: null })
            }
          >
            {securities.map((sec) => (
              <MenuItem key={sec} value={sec}>
                {sec}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {!!row.security && (
        <FormControl sx={{ flex: 1, minWidth: 120 }}>
          <InputLabel>Event to Cancel</InputLabel>
          <Select
            value={row.cancelId ?? ""}
            label="Event to Cancel"
            onChange={(e) => onChange({ cancelId: Number(e.target.value) })}
          >
            {events.map((evt) => (
              <MenuItem key={evt.id} value={evt.id}>
                #{evt.id} — {evt.action} {evt.quantity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {!!selected && (
        <TextField
          label="Original Qty"
          value={selected.quantity}
          InputProps={{ readOnly: true }}
          sx={{ width: 120 }}
        />
      )}
    </Box>
  );
};

export default CancelFields;
