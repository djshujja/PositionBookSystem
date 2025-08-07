import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";

function NavigationTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname === "/positions" ? 0 : 1;
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={currentTab}
        onChange={(_, v) => navigate(v === 0 ? "/positions" : "/events")}
        centered
      >
        <Tab label="Positions" />
        <Tab label="Events" />
      </Tabs>
    </Box>
  );
}

export default NavigationTabs;
