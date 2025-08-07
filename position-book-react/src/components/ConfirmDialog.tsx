import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import type { FormRow, ValidCancelableEvent } from "../types";

interface Props {
  open: boolean;
  rows: FormRow[];
  validEvents: ValidCancelableEvent[];
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<Props> = ({
  open,
  rows,
  validEvents,
  onClose,
  onConfirm,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>Confirm Trade Events</DialogTitle>
    <DialogContent dividers>
      <List>
        {rows.map((row) => {
          const desc =
            row.action === "CANCEL"
              ? `Cancel #${row.cancelId} (${row.security}, qty=${
                  validEvents.find((e) => e.id === row.cancelId)?.quantity
                })`
              : `${row.action} ${row.quantity} ${row.security} on ${row.account}`;
          return (
            <ListItem key={row.key}>
              <ListItemText primary={desc} />
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

export default ConfirmDialog;
