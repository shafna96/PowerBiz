import { Box } from "@mui/material";
import { ContainedButton, DataGridComp, Header } from "components";
import { billColumns } from "data/data";
import React from "react";

import { useNavigate } from "react-router-dom";

const VendorBill = () => {
  const navigate = useNavigate();

  const hanldeNewBillClick = () => {
    navigate("/purchase/newvendorbill");
  };
  const activeBills = [];
  return (
    <Box>
      <Header title={"Vendor Bill List"} />
      <Box>
        <Box display={"flex"}>
          <Box flex={1}></Box>
          <ContainedButton onClick={hanldeNewBillClick}>
            Create Bill
          </ContainedButton>
        </Box>
        <DataGridComp
          // subTitle="Customer Table"
          //   loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={activeBills}
          columns={billColumns}
        />
      </Box>
    </Box>
  );
};

export default VendorBill;
