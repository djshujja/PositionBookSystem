import type { TradeEvent, Position } from "../types";

export function calculatePositions(events: TradeEvent[]): Position[] {
  const activeEvents = new Map<string, TradeEvent>();

  for (const event of events) {
    if (event.type === "CANCEL" && event.targetId) {
      activeEvents.delete(event.targetId);
    } else {
      activeEvents.set(event.id, event);
    }
  }

  const positionMap = new Map<string, Position>();

  for (const event of activeEvents.values()) {
    const key = `${event.account}_${event.securityCode}`;
    const sign = event.type === "BUY" ? 1 : event.type === "SELL" ? -1 : 0;

    if (!positionMap.has(key)) {
      positionMap.set(key, {
        account: event.account,
        securityCode: event.securityCode,
        quantity: 0,
      });
    }

    const position = positionMap.get(key)!;
    position.quantity += sign * event.quantity;
  }

  return Array.from(positionMap.values());
}
