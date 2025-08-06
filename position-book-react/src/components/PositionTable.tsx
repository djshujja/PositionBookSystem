import type { Position } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface Props {
  positions: Position[];
}

export default function PositionTable({ positions }: Props) {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" p={2}>
        Position Summary
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell>Security</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((pos, idx) => (
            <TableRow key={idx}>
              <TableCell>{pos.account}</TableCell>
              <TableCell>{pos.security}</TableCell>
              <TableCell align="right">{pos.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
