export type EventType = "BUY" | "SELL" | "CANCEL";

export interface TradeEvent {
  id: string;
  account: string;
  securityCode: string;
  type: EventType;
  quantity: number;
  targetId?: string; // Used for CANCEL
}

export interface Position {
  account: string;
  securityCode: string;
  quantity: number;
}
