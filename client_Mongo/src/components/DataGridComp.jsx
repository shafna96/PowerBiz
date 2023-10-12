import { Box, useTheme } from "@mui/material";
import React from "react";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";

const DataGridComp = ({
  title,
  subTitle,
  loading,
  getRowId,
  rows,
  columns,
}) => {
  const theme = useTheme();

  return (
    <Box
      mt="40px"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important`,
        },
      }}
    >
      <Header title={title} subTitle={subTitle} /> {/*  */}
      <DataGrid
        sx={{ marginTop: "40px" }}
        loading={loading}
        getRowId={getRowId}
        rows={rows}
        columns={columns}
      />
    </Box>
  );
};

export default DataGridComp;
