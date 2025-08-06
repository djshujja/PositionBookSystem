import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import EventPage from "./pages/EventPage";
import PositionPage from "./pages/PositionPage";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Position Book
          </Typography>
          <Button color="inherit" component={Link} to="/events">
            Events
          </Button>
          <Button color="inherit" component={Link} to="/positions">
            Positions
          </Button>
        </Toolbar>
      </AppBar>

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
