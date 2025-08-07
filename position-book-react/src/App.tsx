// src/App.tsx
import React, { useEffect, useRef } from "react";
import { Tabs, Tab, Box, Typography, Container } from "@mui/material";

import { useAppDispatch } from "./store/hooks";
import { fetchPositions } from "./store/tradeSlicer";
import EventPage from "./pages/EventPage";
import PositionPage from "./pages/PositionPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavigationTabs from "./components/NavigationTabs";

export default function App() {
  const dispatch = useAppDispatch();
  const fetched = useRef(false);
  useEffect(() => {
    if (!fetched.current) {
      dispatch(fetchPositions());
      fetched.current = true;
    }
  }, [dispatch]);
  return (
    <Router>
      <NavigationTabs />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/positions" element={<PositionPage />} />
        </Routes>
      </Container>
    </Router>
  );
}
