import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Box,
  Typography,
  List,
  ListItem,
  Chip,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import type { Position, TradeEvent } from "../types";

export default function PositionTable({
  positions,
}: {
  positions: Position[];
}) {
  const theme = useTheme();
  return (
    <TableContainer component={Paper} sx={{ mt: 3, border: 1 }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <TableCell sx={{ color: theme.palette.common.white }}>
              Account
            </TableCell>
            <TableCell sx={{ color: theme.palette.common.white }}>
              Security
            </TableCell>
            <TableCell sx={{ color: theme.palette.common.white }}>
              Quantity
            </TableCell>
            <TableCell align="right" sx={{ color: theme.palette.common.white }}>
              Details
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((pos) => (
            <Row key={`${pos.account}-${pos.security}`} position={pos} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ position }: { position: Position }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const color = (action: string) =>
    action === "BUY" ? "success" : action === "SELL" ? "warning" : "error";

  return (
    <>
      <TableRow
        hover
        sx={
          open
            ? {
                backgroundColor: theme.palette.grey[100],
              }
            : undefined
        }
      >
        <TableCell>{position.account}</TableCell>
        <TableCell>{position.security}</TableCell>
        <TableCell>{position.quantity}</TableCell>
        <TableCell align="right">
          <IconButton size="small" onClick={() => setOpen((o) => !o)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                p: 2,
                backgroundColor: theme.palette.grey[50],
              }}
            >
              {!position.events?.length ? (
                <Typography variant="body2">No events</Typography>
              ) : (
                <List disablePadding>
                  {position.events.map((e: TradeEvent) => (
                    <ListItem
                      key={e.uid}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: 1,
                        mb: 1,
                        py: 1,
                        px: 2,
                      }}
                    >
                      <Typography variant="body2">{e.id}</Typography>
                      <Chip
                        label={e.action}
                        color={color(e.action)}
                        size="small"
                      />
                      <Typography variant="body2">{e.quantity}</Typography>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
