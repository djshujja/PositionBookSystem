import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import EventPage from "./pages/EventPage";
import PositionPage from "./pages/PositionPage";

function NavigationTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  // Match the tab value with the current route
  const currentTab = location.pathname === "/positions" ? 0 : 1;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) navigate("/positions");
    if (newValue === 1) navigate("/events");
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="h6">Position Book</Typography>
      </Box>
      <Tabs value={currentTab} onChange={handleChange} centered>
        <Tab label="Positions" />
        <Tab label="Events" />
      </Tabs>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <NavigationTabs />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/events" />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/positions" element={<PositionPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
