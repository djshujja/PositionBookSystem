import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { EventType, TradeEvent } from "../types";

interface Props {
  onAddEvent: (event: TradeEvent) => void;
  eventHistory: TradeEvent[];
}

const EventForm: React.FC<Props> = ({ onAddEvent, eventHistory }) => {
  const [account, setAccount] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState<EventType>("BUY");
  const [targetId, setTargetId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event: TradeEvent = {
      id: uuidv4(),
      account,
      securityCode,
      quantity,
      type,
      targetId: type === "CANCEL" ? targetId : undefined,
    };
    onAddEvent(event);
    setAccount("");
    setSecurityCode("");
    setQuantity(0);
    setTargetId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <label>
        Event Type:
        <select
          value={type}
          onChange={(e) => setType(e.target.value as EventType)}
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
          <option value="CANCEL">CANCEL</option>
        </select>
      </label>
      {type !== "CANCEL" && (
        <>
          <label>
            Account:{" "}
            <input
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
            />
          </label>
          <label>
            Security Code:{" "}
            <input
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              required
            />
          </label>
          <label>
            Quantity:{" "}
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
            />
          </label>
        </>
      )}
      {type === "CANCEL" && (
        <label>
          Target Event ID:
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            required
          >
            <option value="">-- Select an Event to Cancel --</option>
            {eventHistory.map((event) => (
              <option key={event.id} value={event.id}>
                {event.type} {event.quantity} ({event.account}/
                {event.securityCode}) - ID: {event.id}
              </option>
            ))}
          </select>
        </label>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventForm;
