import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Chip,
  useTheme,
} from "@mui/material";
import type { FormRow, ValidCancelableEvent } from "../types";
import { SyncAlt } from "@mui/icons-material";

interface Props {
  open: boolean;
  rows: FormRow[];
  validEvents: ValidCancelableEvent[];
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  rows,
  validEvents,
  onClose,
  onConfirm,
}: Props) {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Confirm Trade Events</DialogTitle>
      <DialogContent
        dividers
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <List>
          {rows.map((row) => {
            const desc =
              row.action === "CANCEL"
                ? `Cancel #${row.cancelId} (qty=${
                    validEvents.find((e) => e.id === row.cancelId)?.quantity
                  })`
                : `${row.action} ${row.quantity} ${row.security} on ${row.account}`;
            return (
              <ListItem
                key={row.key}
                sx={{
                  mb: 1,
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    <SyncAlt />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={desc} />
                <Chip
                  label={row.action}
                  color={
                    row.action === "BUY"
                      ? "success"
                      : row.action === "SELL"
                      ? "warning"
                      : "error"
                  }
                  size="small"
                />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Back</Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
