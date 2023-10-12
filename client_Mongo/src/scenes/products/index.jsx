import { Box, Paper } from "@mui/material";
import { ContainedButton, DataGridComp, Header } from "components";
import { billColumns } from "data/data";
import React from "react";

import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();

  const hanldeCreateItemClick = () => {
    navigate("/products/createItem");
  };
  const activeBills = [];
  return (
    <Paper elevation={6} sx={{ p: "1rem 2.5rem", m: "1rem" }}>
      <Header title={"Item List"} />
      <Box>
        <Box display={"flex"}>
          <Box flex={1}></Box>
          <ContainedButton onClick={hanldeCreateItemClick}>
            Create Item
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
    </Paper>
  );
};

export default Product;
