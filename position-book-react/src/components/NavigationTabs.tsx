import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, Typography } from "@mui/material";

const tabConfig = [
  { label: "Positions", path: "/positions" },
  { label: "Events", path: "/events" },
];

const NavigationTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = tabConfig.findIndex((t) =>
    location.pathname.startsWith(t.path)
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(tabConfig[newValue].path);
  };

  return (
    <Box component="header" sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="h6">Position Book</Typography>
      </Box>
      <Tabs
        value={currentTab !== -1 ? currentTab : 0}
        onChange={handleChange}
        centered
      >
        {tabConfig.map((tab) => (
          <Tab key={tab.path} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default NavigationTabs;
