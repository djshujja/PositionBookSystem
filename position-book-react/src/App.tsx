import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, Box } from "@mui/material";
import NavigationTabs from "./components/NavigationTabs";
import EventPage from "./pages/EventPage";
import PositionPage from "./pages/PositionPage";

const App: React.FC = () => (
  <Router>
    <NavigationTabs />

    <Box component="main" sx={{ py: 4 }}>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/positions" element={<PositionPage />} />
          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </Container>
    </Box>
  </Router>
);

export default App;
