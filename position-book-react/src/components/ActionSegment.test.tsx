import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ActionSegment from "./ActionSegment";
import type { TradeAction } from "../types";

describe("ActionSegment", () => {
  it("renders three toggle buttons and highlights the selected one", () => {
    const onChange = jest.fn();
    render(<ActionSegment value="BUY" onChange={onChange} />);

    const group = screen.getByRole("group", { name: /trade action/i });
    expect(group).toBeInTheDocument();

    const buyBtn = screen.getByRole("button", { name: "Buy" });
    const sellBtn = screen.getByRole("button", { name: "Sell" });
    const cancelBtn = screen.getByRole("button", { name: "Cancel" });

    expect(buyBtn).toHaveAttribute("aria-pressed", "true");
    expect(sellBtn).toHaveAttribute("aria-pressed", "false");
    expect(cancelBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onChange with the new value when another button is clicked", () => {
    const onChange = jest.fn();
    render(<ActionSegment value="BUY" onChange={onChange} />);

    const sellBtn = screen.getByRole("button", { name: "Sell" });
    fireEvent.click(sellBtn);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("SELL" as TradeAction);
  });
});
