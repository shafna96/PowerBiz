import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subTitle, sx }) => {
  const theme = useTheme();
  return (
    <Box sx={sx}>
      <Typography
        variant="h4"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        //    sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default Header;
