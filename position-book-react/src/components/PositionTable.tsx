// src/components/PositionTable.tsx

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import type { Position, TradeEvent } from "../types";

interface Props {
  positions: Position[];
}

const PositionTable: React.FC<Props> = ({ positions }) => (
  <TableContainer component={Paper} sx={{ mt: 3 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Account</TableCell>
          <TableCell>Security</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell align="right">Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {positions.map((pos) => (
          <ExpandableRow
            key={`${pos.account}-${pos.security}`}
            position={pos}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const ExpandableRow: React.FC<{ position: Position }> = ({ position }) => {
  const [open, setOpen] = useState(false);

  const getChipColor = (action: string) => {
    switch (action) {
      case "BUY":
        return "success";
      case "SELL":
        return "warning";
      case "CANCEL":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell>{position.account}</TableCell>
        <TableCell>{position.security}</TableCell>
        <TableCell>{position.quantity}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 2,
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Trade Events
              </Typography>
              <Divider sx={{ mb: 1 }} />
              {!position.events || position.events.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No events available
                </Typography>
              ) : (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {position.events.map((event: TradeEvent) => (
                      <TableRow key={event.uid}>
                        <TableCell>{event.id}</TableCell>
                        <TableCell>
                          <Chip
                            label={event.action}
                            color={getChipColor(event.action)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{event.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PositionTable;
