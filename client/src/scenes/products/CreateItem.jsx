import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import ReactFileReader from "react-file-reader";
import { ContainedButton, FlexBetween, Header } from "components";
import { Close, ExpandMore } from "@mui/icons-material";
import { useCloseComponent } from "components/useCloseComponent";
import { useTheme } from "@emotion/react";

const CreateItem = () => {
  const handleClose = useCloseComponent();
  const [url, setUrl] = useState(
    "https://w7.pngwing.com/pngs/235/452/png-transparent-cloud-upload-upload-cloud-file-storage-project-management-icon-thumbnail.png"
  );

  const handleFiles = (files) => {
    console.log(files);
    setUrl(files.base64);
  };

  return (
    <Box>
      <FlexBetween
        sx={{
          position: "sticky",
          top: "65px",
          backgroundColor: "white",
          zIndex: 2,
        }}
      >
        <Header title={"Vendor Bill"} />
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            borderRadius: 0, // Make the Button circular
            backgroundColor: "red",
            padding: "2px",
            margin: "6px",
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
      <Box sx={{ display: "flex" }}>
        <Box sx={{ position: "relative", alignSelf: "center", width: "186px" }}>
          <img
            src={url}
            alt="upload"
            style={{
              width: "186px",
              height: "186px",
              borderRadius: "10%",
              objectFit: "cover", // Adding object-fit style
            }}
          />
          <ReactFileReader
            fileTypes={[".png", ".jpg"]}
            base64={true}
            handleFiles={handleFiles}
          >
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <ContainedButton sx={{ alignSelf: "center" }}>
                Upload
              </ContainedButton>
            </Box>
          </ReactFileReader>
        </Box>
        <Box sx={{ flex: 1 }}>
          <AccordionComp accordionTitle={"Item Classification"} expanded>
            <Box width={"100%"} height={"100px"}></Box>
          </AccordionComp>
        </Box>
      </Box>
      <Box>
        <AccordionComp accordionTitle={"Item Details"} id="summary-details">
          <Box width={"100%"} height={"100px"}></Box>
        </AccordionComp>
        <AccordionComp
          accordionTitle={"Pricing & Measuring"}
          id="summary-pricing"
        >
          <Box width={"100%"} height={"100px"}></Box>
        </AccordionComp>
        <AccordionComp
          accordionTitle={"Discount & Promotions"}
          id="summary-discount"
        >
          <Box width={"100%"} height={"100px"}></Box>
        </AccordionComp>
        <AccordionComp
          accordionTitle={"Item Specification"}
          id="summary-specification"
        >
          <Box width={"100%"} height={"100px"}></Box>
        </AccordionComp>
        <AccordionComp
          accordionTitle={"Item Quantity Detail"}
          id="summary-quantity"
        >
          <Box width={"100%"} height={"100px"}></Box>
        </AccordionComp>
        <AccordionComp
          accordionTitle={"Additional Details"}
          id="summary-additional"
        >
          <Box width={"100%"} height={"100px"}></Box>
        </AccordionComp>
      </Box>
    </Box>
  );
};

export default CreateItem;

const AccordionComp = (props) => {
  const theme = useTheme();
  const { accordionTitle, children } = props;
  return (
    <Accordion {...props}>
      <AccordionSummary
        sx={{
          backgroundColor: theme.palette.background.alt,
        }}
        expandIcon={<ExpandMore />}
      >
        <Typography>{accordionTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
