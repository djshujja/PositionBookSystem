import { useState } from "react";
import PositionTable from "./components/PositionTable";
import EventForm from "./components/EventForm";
import { calculatePositions } from "./utils/positionReducer";
import type { TradeEvent } from "./types";

const App = () => {
  const [events, setEvents] = useState<TradeEvent[]>([]);

  const addEvent = (event: TradeEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const positions = calculatePositions(events);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📘 Position Book UI</h1>
      <EventForm onAddEvent={addEvent} eventHistory={events} />
      <hr />
      <PositionTable positions={positions} />
    </div>
  );
};

export default App;
