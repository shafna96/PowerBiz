import { Close } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, useTheme } from "@mui/material";
import { FlexBetween, Header, TextFieldComp } from "components";
import { useCloseComponent } from "components/useCloseComponent";
import { vendorFieldData } from "data";
import React from "react";

const CreateVendor = () => {
  const theme = useTheme();
  const handleClose = useCloseComponent();
  return (
    <Box>
      <FlexBetween
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          backgroundColor: "white",
          height: "50px",
        }}
      >
        <Header title={"New Vendor"} sx={{ paddingLeft: "1rem" }} />
      </FlexBetween>
      <Paper
        elevation={6}
        sx={{
          //  backgroundColor: theme.palette.grey[100],
          m: "1rem",
        }}
      >
        <FlexBetween>
          <Box flex={1} />
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              borderRadius: 0, // Make the Button circular
              backgroundColor: "red",
            }}
          >
            <Close
              sx={{
                color: "white",
                fontSize: "16px", // Adjust the font size of the icon as needed
              }}
            />
          </IconButton>
        </FlexBetween>
        <Box
          sx={{
            p: "1rem",
            overflowY: "auto",
            paddingY: "10px", // Add appropriate spacing
            display: "flex",
            // flexDirection: "column",
            minHeight: "calc(100vh - 220px)", // Set minimum height of the page to 100vh
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Grid container spacing={2}>
              {vendorFieldData.map((textField, index) => (
                <Grid item key={index} xs={12} sm={textField.width}>
                  <TextFieldComp
                    // sx={{ backgroundColor: "white" }}
                    required={textField.required && textField.required}
                    label={textField.label}
                    select={textField.select && textField.select}
                  >
                    {textField.select && textField.renderMenu()}
                  </TextFieldComp>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateVendor;
