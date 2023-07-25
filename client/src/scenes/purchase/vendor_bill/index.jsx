import { Box, useTheme, IconButton } from "@mui/material";
import { Header, VendorBody, VendorHeader } from "components";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
const VenderBill = () => {
  const theme = useTheme();
  const handleClose = () => {
    // Add your logic here to handle closing the VendorBill component
  };
  return (
    <Box
      m="1.5rem 2.5rem"
      sx={{
        // paddingX: "25px",
        //  marginTop: "40px",
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <Box sx={{ display: "flex" }}>
        {/* <IconButton
          onClick={handleClose}
          sx={{
            //   position: "absolute",
            //  top: "1rem",
            // right: "1rem",
            color: "red",
          }}
        > */}
        <Box sx={{ flex: 1 }} />
        <CloseIcon
          sx={{
            color: "white",
            backgroundColor: "red",
            justifyContent: "left",
            margin: "5px",
            padding: "3px",
            fontSize: "sm",
          }}
        />
        {/* </IconButton> */}
      </Box>
      <Box sx={{ padding: "25px" }}>
        <Header title="Vendor Bill" />
        <VendorHeader />
        <VendorBody />
      </Box>
    </Box>
  );
};

export default VenderBill;
