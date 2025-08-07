// src/App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

describe("App shell", () => {
  it("renders header tabs and defaults to Events view", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check that both tabs are present
    expect(screen.getByRole("tab", { name: "Positions" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Events" })).toBeInTheDocument();

    // Since App redirects "/" → "/events", the EventPage heading should appear
    expect(
      screen.getByRole("heading", { name: /Create Trade Event/i })
    ).toBeInTheDocument();
  });
});
