import type { Position, TradeEvent } from "../types";

export const postTrades = async (events: TradeEvent[]) => {
  const response = await fetch("http://localhost:8080/api/trades", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ events }),
  });

  if (!response.ok) {
    throw new Error("Failed to post trades");
  }

  return response.json();
};

export const getPositions = async (): Promise<Position[]> => {
  const response = await fetch("http://localhost:8080/api/trades/positions");

  if (!response.ok) {
    throw new Error("Failed to fetch positions");
  }

  return response.json();
};
