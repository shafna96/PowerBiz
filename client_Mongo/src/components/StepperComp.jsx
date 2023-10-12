import { Box, Step, StepLabel, Stepper, useTheme } from "@mui/material";
import { LockOpen, Drafts, Done } from "@mui/icons-material";
import React from "react";

const steps = [
  { label: "Open", icon: LockOpen },
  { label: "Draft", icon: Drafts },
  { label: "Approved", icon: Done },
];

const StepperComp = () => {
  const theme = useTheme();
  //const stepWidth = `${100 / steps.length}%`;
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stepper
        activeStep={1}
        alternativeLabel
        sx={{
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {steps.map((item) => (
          <Step key={item.label}>
            <StepLabel
              sx={{
                "& .MuiSvgIcon-root": {
                  backgroundColor: theme.palette.secondary.dark,
                  borderRadius: "50%",
                  p: "4px", // Adjust the padding to control the size of the icon container
                  height: "25px",
                  width: "25px",
                  color: "white",
                },
                "& .MuiStepLabel-label": {
                  fontSize: "0.7rem", // Adjust the font size of the label
                  marginY: "0.2rem", // Adjust the top margin of the label
                },
              }}
              StepIconComponent={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperComp;
