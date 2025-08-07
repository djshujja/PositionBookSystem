import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BuySellFields from "./BuySellFields";
import type { FormRow } from "../types";

describe("BuySellFields", () => {
  const mockOnChange = jest.fn();
  const initialRow: FormRow = {
    key: 0,
    action: "BUY",
    account: "ACC1",
    security: "SEC1",
    quantity: 10,
    cancelId: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders inputs with the provided row values", () => {
    render(<BuySellFields row={initialRow} onChange={mockOnChange} />);
    expect(screen.getByLabelText("Account")).toHaveValue("ACC1");
    expect(screen.getByLabelText("Security")).toHaveValue("SEC1");
    expect(screen.getByLabelText("Quantity")).toHaveValue(10);
  });

  it("calls onChange when the Account input changes", () => {
    render(<BuySellFields row={initialRow} onChange={mockOnChange} />);
    fireEvent.change(screen.getByLabelText("Account"), {
      target: { value: "ACC2" },
    });
    expect(mockOnChange).toHaveBeenCalledWith({ account: "ACC2" });
  });

  it("calls onChange when the Security input changes", () => {
    render(<BuySellFields row={initialRow} onChange={mockOnChange} />);
    fireEvent.change(screen.getByLabelText("Security"), {
      target: { value: "SEC2" },
    });
    expect(mockOnChange).toHaveBeenCalledWith({ security: "SEC2" });
  });

  it("calls onChange when the Quantity input changes", () => {
    render(<BuySellFields row={initialRow} onChange={mockOnChange} />);
    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: "20" },
    });
    expect(mockOnChange).toHaveBeenCalledWith({ quantity: 20 });
  });
});
