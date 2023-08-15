import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme, AppBar, Tabs, Tab, Box } from "@mui/material";
import { FlexBetween } from "components";

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
    <Box sx={{ bgcolor: "white" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          "& .MuiBox-root": {
            background: "white",
            borderTopLeftRadius: "10px",
          },
          "& .MuiTabs-root": {
            backgroundColor: "white",
          },
        }}
      >
        <FlexBetween>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            variant="fullWidth"
            //   aria-label="full width tabs example"
            sx={{
              width: 380,
              //flex: 1,
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.primary.light,
              },

              "& .MuiTabs-flexContainer": {
                borderTopLeftRadius: 5, //"0.5rem",
                borderTopRightRadius: 5, //"0.5rem",
              },
              "& .Mui-selected": {
                backgroundColor: theme.palette.primary.light,
                borderTop: `3px solid ${theme.palette.secondary.dark}`,
                borderTopLeftRadius: 5, //"0.5rem",
                borderTopRightRadius: 5, //"0.5rem",
                //   borderTopColor: theme.palette.secondary.dark,
                //    borderTopWidth: "3px",
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
