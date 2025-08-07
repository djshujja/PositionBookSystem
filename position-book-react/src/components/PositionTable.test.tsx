import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PositionTable from "./PositionTable";
import type { Position, TradeEvent } from "../types";

describe("PositionTable", () => {
  const samplePositionNoEvents: Position = {
    account: "ACC1",
    security: "SEC1",
    quantity: 100,
    events: [],
  };

  const sampleEvents: TradeEvent[] = [
    {
      uid: "u1",
      id: 1,
      action: "BUY",
      account: "ACC1",
      security: "SEC1",
      quantity: 50,
    },
    {
      uid: "u2",
      id: 2,
      action: "SELL",
      account: "ACC1",
      security: "SEC1",
      quantity: 20,
    },
  ];
  const samplePositionWithEvents: Position = {
    account: "ACC2",
    security: "SEC2",
    quantity: 30,
    events: sampleEvents,
  };

  it("renders header cells and rows for positions", () => {
    render(<PositionTable positions={[samplePositionNoEvents]} />);
    // Header cells
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    // Row values
    expect(screen.getByText("ACC1")).toBeInTheDocument();
    expect(screen.getByText("SEC1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("shows 'No events' when a row has no events", async () => {
    render(<PositionTable positions={[samplePositionNoEvents]} />);
    // click the details toggle
    const toggleBtn = screen.getByRole("button");
    await userEvent.click(toggleBtn);
    // after expanding, should show "No events"
    expect(await screen.findByText("No events")).toBeInTheDocument();
  });

  it("displays the list of events when present", async () => {
    render(<PositionTable positions={[samplePositionWithEvents]} />);
    // verify row quantity
    expect(screen.getByText("30")).toBeInTheDocument();
    // expand details
    const toggleBtn = screen.getByRole("button");
    await userEvent.click(toggleBtn);
    // event items should appear
    expect(await screen.findByText("1")).toBeInTheDocument();
    expect(screen.getByText("BUY")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("SELL")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});
