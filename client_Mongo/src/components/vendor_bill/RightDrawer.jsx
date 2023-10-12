import { Box, Drawer, useTheme } from "@mui/material";
import React from "react";

const RightDrawer = ({
  wrapperWidth,
  open,
  onClose,
  isNonMobile,
  children,
}) => {
  const theme = useTheme();

  return (
    <Box width={wrapperWidth}>
      <Drawer
        open={open}
        onClose={onClose}
        variant="persistent"
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSizing: "border-box",
          },
        }}
      />
      <Box
        sx={{
          borderLeft: isNonMobile && "2px solid #ccc",
          width: "100%",
          height: "100%",
          padding: "10px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default RightDrawer;
