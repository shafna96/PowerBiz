import { TextField, useTheme } from "@mui/material";
import React from "react";

const TextFieldComp = (props) => {
  const theme = useTheme();

  const { select, children, sx, width, multiline, rows } = props;
  return (
    <TextField
      {...props}
      // InputLabelProps={{
      //   style: {
      //     color: theme.palette.primary[300],
      //   },
      // }}
      sx={{
        ...sx,
        width: width,
        marginY: "5px",
        "& label.Mui-focused": {
          color: theme.palette.primary[300],
        },
        // "& .MuiFilledInput-underline:after": {
        //   borderBottomColor: theme.palette.primary[500],
        // },
        "& .MuiInput-underline:after": {
          borderBottomColor: theme.palette.primary[500],
        },
      }}
      fullWidth
      //   color="secondary"
      variant="standard"
      select={select}
      multiline={multiline}
      rows={rows}
    >
      {select && children}
    </TextField>
  );
};

export default TextFieldComp;
