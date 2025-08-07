// src/components/ActionSegment.tsx

import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import type { TradeAction } from "../types";

const StyledSegment = styled(ToggleButtonGroup)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.grey[100],
  margin: 20,
  borderRadius: theme.shape.borderRadius,
  "& .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiToggleButton-root": {
    flex: 1,
    textTransform: "none",
    border: 0,
    padding: theme.spacing(1.25, 2),
    fontWeight: theme.typography.button.fontWeight,
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

interface Props {
  value: TradeAction;
  onChange: (val: TradeAction) => void;
}

const ActionSegment: React.FC<Props> = ({ value, onChange }) => (
  <StyledSegment
    exclusive
    value={value}
    onChange={(_, val) => val && onChange(val as TradeAction)}
    aria-label="trade action"
  >
    <ToggleButton value="BUY">Buy</ToggleButton>
    <ToggleButton value="SELL">Sell</ToggleButton>
    <ToggleButton value="CANCEL">Cancel</ToggleButton>
  </StyledSegment>
);

export default ActionSegment;
