import React from "react";
import { render, screen } from "@testing-library/react";
import PositionPage from "./PositionPage";
import * as hooks from "../store/hooks";

// Mock the Redux hooks
jest.mock("../store/hooks");
const useAppSelector = hooks.useAppSelector as jest.Mock;

// Mock the PositionTable component
jest.mock("../components/PositionTable", () => {
  return function MockPositionTable(props: { positions: any[] }) {
    return <div data-testid="mock-table">{props.positions.length} rows</div>;
  };
});

describe("PositionPage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("shows a loading spinner when loading is true", () => {
    useAppSelector.mockImplementation((sel) =>
      sel({ trades: { positions: [], events: [], loading: true, error: null } })
    );
    render(<PositionPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows empty state when there are no positions", () => {
    useAppSelector.mockImplementation((sel) =>
      sel({
        trades: { positions: [], events: [], loading: false, error: null },
      })
    );
    render(<PositionPage />);
    expect(screen.getByText("No positions yet")).toBeInTheDocument();
  });

  it("renders the PositionTable when positions exist", () => {
    const fakePositions = [
      { account: "A1", security: "S1", quantity: 5, events: [] },
      { account: "A2", security: "S2", quantity: 3, events: [] },
    ];
    useAppSelector.mockImplementation((sel) =>
      sel({
        trades: {
          positions: fakePositions,
          events: [],
          loading: false,
          error: null,
        },
      })
    );
    render(<PositionPage />);
    expect(screen.getByTestId("mock-table")).toHaveTextContent("2 rows");
  });

  it("shows an error snackbar when error is non-null", () => {
    const errMsg = "Network failure";
    useAppSelector.mockImplementation((sel) =>
      sel({
        trades: { positions: [], events: [], loading: false, error: errMsg },
      })
    );
    render(<PositionPage />);
    expect(screen.getByText(errMsg)).toBeInTheDocument();
  });
});
