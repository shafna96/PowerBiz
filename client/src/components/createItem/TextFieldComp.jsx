import { TextField } from "@mui/material";
import React from "react";

const TextFieldComp = (props) => {
  const { select, children } = props;
  return (
    <TextField {...props} fullWidth variant="standard" select={select}>
      {select && children}
    </TextField>
  );
};

export default TextFieldComp;
