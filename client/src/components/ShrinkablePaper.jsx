import React from "react";
import { Box, TextField } from "@mui/material";

const ShrinkablePaper = ({ label, children }) => {
  return (
    <Box>
      <TextField
        fullWidth
        label={label}
        InputLabelProps={{
          shrink: true,
          readOnly: true,
        }}
      >
        {children}
      </TextField>
    </Box>
  );
};

export default ShrinkablePaper;
