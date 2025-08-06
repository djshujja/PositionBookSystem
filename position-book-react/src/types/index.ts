export type TradeAction = "BUY" | "SELL" | "CANCEL";

export interface TradeEvent {
  id: number;
  action: TradeAction;
  account: string;
  security: string;
  quantity: number;
}

export interface Position {
  account: string;
  security: string;
  quantity: number;
}
