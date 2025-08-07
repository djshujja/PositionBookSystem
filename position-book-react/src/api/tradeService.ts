import type { Position, TradeEvent } from "../types";
import axiosInstance from "../api/axiosInstance";

/**
 * POST one or more trade events.
 * @throws Error if the request fails.
 */
export async function postTrades(events: TradeEvent[]): Promise<void> {
  await axiosInstance.post("/trades", { events });
}

/**
 * GET the current positions.
 * @returns an array of Position objects.
 * @throws Error if the request fails.
 */
export async function getPositions(): Promise<Position[]> {
  const response = await axiosInstance.get<{ Positions: Position[] }>(
    "/trades/positions"
  );
  return response.data.Positions;
}
