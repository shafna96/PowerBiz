import {
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";

const TextFieldComp = ({
  column,
  value,
  onChange,
  select,
  type,
  multiline,
  rows,
  children,
  error,
  sm,
  helperText,
}) => {
  const inputId = `${column.field}-input`;
  // const columnError = error && error[column.field];
  return (
    <Grid key={column.field} item xs={12} sm={sm} padding={"5px"}>
      <TextField
        required={column.required}
        name={column.field}
        id={column.field}
        value={value[column.field]}
        label={column.headerName}
        onChange={onChange}
        variant="outlined"
        fullWidth
        color="textfield"
        error={error}
        type={type}
        select={select}
        multiline={multiline}
        rows={rows}
        InputProps={{
          id: column.field,
          //  type: column.type,
        }}
        InputLabelProps={select ? { htmlFor: inputId } : {}}
      >
        {select && children}
      </TextField>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </Grid>
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
  image,
  error,
  edit,
  helperText,
}) => {
  const theme = useTheme();

  const TextFieldRender = (column) => {
    if (column.field === option) {
      return (
        <TextFieldComp
          value={value}
          column={column}
          onChange={handleChange}
          error={error}
          helperText={helperText}
          select
          sm={4}
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
          error={error}
          helperText={helperText}
          multiline
          rows={3}
          sm={8}
        />
      );
    }
    if (column.field === image) {
      return (
        <TextFieldComp
          value={value}
          column={column}
          onChange={handleChange}
          error={error}
          helperText={helperText}
          sm={12}
          type={"file"}
        />
      );
    }
    return (
      <TextFieldComp
        value={value}
        column={column}
        onChange={handleChange}
        error={error}
        helperText={helperText}
        sm={4}
      />
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
          <React.Fragment key={column.field}>
            {TextFieldRender(column)}
          </React.Fragment>
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
