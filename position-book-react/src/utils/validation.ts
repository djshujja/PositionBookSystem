import type { FormRow } from "../types";

export function validateRows(rows: FormRow[]): string | null {
  for (const row of rows) {
    if (row.action !== "CANCEL") {
      if (!row.account || !row.security || row.quantity <= 0) {
        return "Account, Security & Quantity are required for BUY/SELL.";
      }
    } else {
      if (!row.account || !row.security || row.cancelId == null) {
        return "Select Account, Security & Event to cancel.";
      }
    }
  }
  return null;
}
