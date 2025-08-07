import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import { useAppDispatch } from "./store/hooks";
import { fetchPositions } from "./store/tradeSlicer";
import EventPage from "./pages/EventPage";
import PositionPage from "./pages/PositionPage";

function NavigationTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname === "/positions" ? 0 : 1;

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="h6">Position Book</Typography>
      </Box>
      <Tabs
        value={currentTab}
        onChange={(_, newValue) =>
          newValue === 0 ? navigate("/positions") : navigate("/events")
        }
        centered
      >
        <Tab label="Positions" />
        <Tab label="Events" />
      </Tabs>
    </Box>
  );
}

function App() {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchPositions());
      hasFetched.current = true;
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

export default App;
