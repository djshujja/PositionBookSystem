export type TradeAction = "BUY" | "SELL" | "CANCEL";

export interface TradeEvent {
  id: number | null;
  action: TradeAction;
  account: string;
  security: string;
  quantity: number;
}

export interface Position {
  account: string;
  security: string;
  quantity: number;
  events?: TradeEvent[];
}

export interface FormRow {
  key: number;
  action: TradeAction;
  account: string;
  security: string;
  quantity: number; // used for BUY/SELL
  cancelId: number | null; // used for CANCEL
}

export interface CancelableEvent extends TradeEvent {
  account: string;
  security: string;
}

export type ValidCancelableEvent = CancelableEvent & { id: number };
