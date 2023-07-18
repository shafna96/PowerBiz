import { Box } from "@mui/material";
import { Header, VendorHeaderComp } from "components";
import React from "react";

const VenderBill = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Vendor Bill" />
      <VendorHeaderComp />
    </Box>
  );
};

export default VenderBill;
