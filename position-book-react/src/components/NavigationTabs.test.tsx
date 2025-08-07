import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavigationTabs from "./NavigationTabs";

const mockNavigate = jest.fn();
let mockPathname = "/events";

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({ pathname: mockPathname }),
    useNavigate: () => mockNavigate,
  };
});

describe("NavigationTabs", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("highlights Events tab when pathname is /events", () => {
    mockPathname = "/events";
    render(<NavigationTabs />);

    const positionsTab = screen.getByRole("tab", { name: "Positions" });
    const eventsTab = screen.getByRole("tab", { name: "Events" });

    expect(eventsTab).toHaveAttribute("aria-selected", "true");
    expect(positionsTab).toHaveAttribute("aria-selected", "false");
  });

  it("highlights Positions tab when pathname is /positions", () => {
    mockPathname = "/positions";
    render(<NavigationTabs />);

    const positionsTab = screen.getByRole("tab", { name: "Positions" });
    const eventsTab = screen.getByRole("tab", { name: "Events" });

    expect(positionsTab).toHaveAttribute("aria-selected", "true");
    expect(eventsTab).toHaveAttribute("aria-selected", "false");
  });

  it("navigates to /positions when Positions tab is clicked", async () => {
    mockPathname = "/events";
    render(<NavigationTabs />);

    await userEvent.click(screen.getByRole("tab", { name: "Positions" }));
    expect(mockNavigate).toHaveBeenCalledWith("/positions");
  });

  it("navigates to /events when Events tab is clicked", async () => {
    mockPathname = "/positions";
    render(<NavigationTabs />);

    await userEvent.click(screen.getByRole("tab", { name: "Events" }));
    expect(mockNavigate).toHaveBeenCalledWith("/events");
  });
});
