import { Box } from "@mui/material";
import React from "react";
import {
  ContainedButton,
  FlexBetween,
  FlexEvenly,
  OutlinedButton,
} from "./styledComponents";
import { Delete, Edit, Share } from "@mui/icons-material";
import StepperComp from "./StepperComp";

const FooterButtons = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "sticky",
        paddingX: "10px",
        borderTop: "1px solid #ccc",
        backgroundColor: "white",
        zIndex: 2,
        height: "65px",
        //    marginTop: "auto",
        bottom: 0,
      }}
    >
      <FlexEvenly sx={{ width: "285px" }}>
        <OutlinedButton
          sx={{ width: "90px" }}
          variant="outlined"
          startIcon={<Edit />}
        >
          Edit
        </OutlinedButton>

        <OutlinedButton
          sx={{ width: "90px" }}
          variant="outlined"
          startIcon={<Delete />}
        >
          Delete
        </OutlinedButton>
        <OutlinedButton
          sx={{ width: "90px" }}
          variant="outlined"
          startIcon={<Share />}
        >
          Share
        </OutlinedButton>
      </FlexEvenly>
      <StepperComp />
      <FlexBetween sx={{ width: "165px" }}>
        <ContainedButton sx={{ width: "80px" }}>Save</ContainedButton>

        <ContainedButton sx={{ width: "80px" }}>Approve</ContainedButton>
      </FlexBetween>
    </Box>
  );
};

export default FooterButtons;
