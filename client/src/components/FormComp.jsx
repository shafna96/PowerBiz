import { Box, Button, Grid, TextField, useTheme } from "@mui/material";
import React from "react";

const TextFieldComp = ({
  column,
  value,
  onChange,
  select,
  multiline,
  rows,
  children,
}) => {
  const inputId = `${column.field}-input`;
  return (
    <TextField
      name={column.field}
      id={column.field}
      value={value[column.field]}
      label={column.headerName}
      onChange={onChange}
      variant="outlined"
      fullWidth
      color="textfield"
      select={select}
      multiline={multiline}
      rows={rows}
      inputProps={{
        id: column.field,
      }}
      InputLabelProps={select ? { htmlFor: inputId } : {}}
    >
      {select && children}
    </TextField>
  );
};

const FormComp = ({
  handleSubmit,
  data,
  handleChange,
  value,
  option,
  menuItem,
  comment,
  edit,
}) => {
  const theme = useTheme();

  const TextFieldRender = (column) => {
    if (column.field === option) {
      return (
        <TextFieldComp
          value={value}
          column={column}
          onChange={handleChange}
          select
        >
          {menuItem}
        </TextFieldComp>
      );
    }
    if (column.field === comment) {
      return (
        <TextFieldComp
          value={value}
          column={column}
          onChange={handleChange}
          multiline
          rows={4}
        />
      );
    }
    return (
      <TextFieldComp value={value} column={column} onChange={handleChange} />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        rowGap={1}
        sx={{
          padding: "25px",
          marginTop: "40px",
          backgroundColor: theme.palette.primary.light,
        }}
      >
        {data.map((column) => (
          <Grid key={column.field} item xs={12} sm={4} padding={"5px"}>
            {TextFieldRender(column)}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ width: "18%" }}
              type="submit"
              // onSubmit={handleSubmit}
            >
              {edit ? "SAVE" : "ADD"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormComp;
