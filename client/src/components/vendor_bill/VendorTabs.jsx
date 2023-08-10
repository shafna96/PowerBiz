import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme, AppBar, Tabs, Tab, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";

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
  sideButtons,
}) {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar
        position="static"
        sx={{
          "& .MuiBox-root": {
            backgroundColor: "white",
            borderTopLeftRadius: "10px",
          },
        }}
      >
        <FlexBetween>
          <Tabs
            value={value}
            onChange={handleChange}
            // textColor="inherit"
            variant="fullWidth"
            //   aria-label="full width tabs example"
            sx={{
              width: 500,
              //flex: 1,
              "& .MuiTabs-indicator": {
                backgroundColor: "white",
              },
              "& .MuiTabs-flexContainer": {
                backgroundColor: theme.palette.primary[700],
                borderTopRightRadius: "1.5rem",
              },
              "& .Mui-selected": {
                borderWidth: 1,
                borderRightColor: "white",
                backgroundColor: theme.palette.primary[300],
                borderTopRightRadius: "1.5rem",
              },
            }}
          >
            {tabs.map((tab, index) => {
              return (
                <Tab
                  sx={{
                    fontWeight: "bold",
                    borderWidth: 1,
                    borderColor: "white",
                  }}
                  key={tab.id}
                  label={tab.label}
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
          {sideButtons}
        </FlexBetween>
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
