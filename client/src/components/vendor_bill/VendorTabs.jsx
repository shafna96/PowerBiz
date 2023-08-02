import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme, AppBar, Tabs, Tab, Box } from "@mui/material";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function VendorTabs({
  value,
  handleChange,
  handleChangeIndex,
  children,
  tabs,
}) {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar position="static" sx={{ width: 500 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.primary[300],
            },
          }}
        >
          {tabs.map((tab, index) => {
            return (
              <Tab
                sx={{
                  fontWeight: "bold",
                }}
                key={tab.id}
                label={tab.label}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {children}
      </SwipeableViews>
    </Box>
  );
}

export default VendorTabs;
