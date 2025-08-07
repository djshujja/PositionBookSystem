// src/types/index.ts

/** Which actions are allowed */
export type TradeAction = "BUY" | "SELL" | "CANCEL";

export interface TradeEvent {
  uid?: string;
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
  quantity: number;
  cancelId: number | null;
}

export interface CancelableEvent extends TradeEvent {
  account: string;
  security: string;
}

export type ValidCancelableEvent = CancelableEvent & { id: number };
