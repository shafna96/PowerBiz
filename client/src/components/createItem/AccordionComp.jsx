import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const AccordionComp = (props) => {
  const theme = useTheme();
  const { summary, children } = props;
  return (
    <Accordion {...props} sx={{ marginY: "10px" }}>
      <AccordionSummary
        sx={
          {
            //  backgroundColor: theme.palette.background.alt,
          }
        }
        expandIcon={<ExpandMore />}
      >
        <Typography>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionComp;
