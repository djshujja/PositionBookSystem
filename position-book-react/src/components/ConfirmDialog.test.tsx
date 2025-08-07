import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDialog from "./ConfirmDialog";
import type { FormRow, ValidCancelableEvent } from "../types";

describe("ConfirmDialog", () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  const validEvents: ValidCancelableEvent[] = [
    {
      uid: "u1",
      id: 1,
      action: "BUY",
      account: "A1",
      security: "S1",
      quantity: 10,
    },
  ];

  const rows: FormRow[] = [
    {
      key: 1,
      action: "BUY",
      account: "A1",
      security: "S1",
      quantity: 10,
      cancelId: null,
    },
    {
      key: 2,
      action: "CANCEL",
      account: "A1",
      security: "S1",
      quantity: 0,
      cancelId: 1,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when open is false", () => {
    render(
      <ConfirmDialog
        open={false}
        rows={rows}
        validEvents={validEvents}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders title, descriptions, chips, and buttons when open is true", () => {
    render(
      <ConfirmDialog
        open={true}
        rows={rows}
        validEvents={validEvents}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );

    // Dialog and title
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeVisible();
    expect(
      screen.getByRole("heading", { name: /Confirm Trade Events/i })
    ).toBeInTheDocument();

    // Descriptions
    expect(screen.getByText("BUY 10 S1 on A1")).toBeInTheDocument();
    expect(screen.getByText("Cancel #1 (qty=10)")).toBeInTheDocument();

    // Chips
    expect(screen.getByText("BUY")).toBeInTheDocument();
    expect(screen.getByText("CANCEL")).toBeInTheDocument();

    // Buttons
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Confirm/i })
    ).toBeInTheDocument();
  });

  it("calls onClose when Back is clicked", () => {
    render(
      <ConfirmDialog
        open={true}
        rows={rows}
        validEvents={validEvents}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when Confirm is clicked", () => {
    render(
      <ConfirmDialog
        open={true}
        rows={rows}
        validEvents={validEvents}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
