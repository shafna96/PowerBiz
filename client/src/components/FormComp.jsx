import { Box, Button, Grid, TextField, useTheme } from "@mui/material";
import React from "react";

const FormComp = ({
  handleSubmit,
  data,
  handleChange,
  value,
  option,
  menuItem,
  edit,
}) => {
  const theme = useTheme();

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
            {column.field === option ? (
              <TextField
                name={column.field}
                //  id={column.field}
                value={value[column.field]}
                label={column.headerName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                color="textfield"
                select
              >
                {menuItem}
              </TextField>
            ) : (
              <TextField
                name={column.field}
                //  id={column.field}
                value={value[column.field]}
                label={column.headerName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                color="textfield"
              />
            )}
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
