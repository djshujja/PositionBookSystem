// src/pages/EventPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventPage from "./EventPage";
import * as hooks from "../store/hooks";

// Mock Redux hooks
jest.mock("../store/hooks");
const useAppDispatch = hooks.useAppDispatch as jest.Mock;
const useAppSelector = hooks.useAppSelector as jest.Mock;

describe("EventPage basic interactions", () => {
  beforeEach(() => {
    // stub dispatch
    useAppDispatch.mockReturnValue(jest.fn());
    // no positions for simplicity
    useAppSelector.mockImplementation((selector) =>
      selector({
        trades: { positions: [], events: [], loading: false, error: null },
      })
    );
  });

  it("initially shows one action segment row", () => {
    render(<EventPage />);
    const segments = screen.getAllByRole("group", { name: /trade action/i });
    expect(segments).toHaveLength(1);
  });

  it("adds a new row when 'Add Event' is clicked", async () => {
    render(<EventPage />);
    const addBtn = screen.getByRole("button", { name: /Add Event/i });
    await userEvent.click(addBtn);
    const segments = screen.getAllByRole("group", { name: /trade action/i });
    expect(segments).toHaveLength(2);
  });
});
