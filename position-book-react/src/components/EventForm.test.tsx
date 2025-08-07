import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventForm from "./EventForm";
import type { TradeEvent } from "../types";

describe("EventForm", () => {
  it("renders all form fields with defaults", () => {
    const onSubmit = jest.fn();
    render(<EventForm onSubmit={onSubmit} />);

    // Heading
    expect(screen.getByText("Create Trade Event")).toBeInTheDocument();

    // Submit button
    expect(screen.getByRole("button", { name: "Submit" })).toBeEnabled();
  });

  it("calls onSubmit with correct BUY payload", async () => {
    const onSubmit = jest.fn();
    render(<EventForm onSubmit={onSubmit} />);

    // Fill required fields
    await userEvent.type(screen.getByLabelText("Account"), "ACC1");
    await userEvent.type(screen.getByLabelText("Security"), "SEC1");
    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: "25" },
    });

    // Submit form
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    // onSubmit should have been called once
    expect(onSubmit).toHaveBeenCalledTimes(1);

    // Inspect the submitted event
    const submitted: TradeEvent = onSubmit.mock.calls[0][0];
    expect(submitted).toMatchObject({
      action: "BUY",
      account: "ACC1",
      security: "SEC1",
      quantity: 25,
    });
    expect(typeof submitted.id).toBe("number");
  });
});
