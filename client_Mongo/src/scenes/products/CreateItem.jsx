import React, { useState } from "react";
import { Box, Grid, IconButton, Paper, useTheme } from "@mui/material";
import ReactFileReader from "react-file-reader";
import {
  AccordionComp,
  ContainedButton,
  FlexBetween,
  FooterButtons,
  Header,
  TextFieldComp,
} from "components";
import { Close } from "@mui/icons-material";
import { useCloseComponent } from "components/useCloseComponent";
import { accordionData } from "data";

const CreateItem = () => {
  const theme = useTheme();
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
          top: 0,
          zIndex: 2,
          backgroundColor: "white",
          height: "50px",
        }}
      >
        <Header title={"New Item"} sx={{ paddingLeft: "1rem" }} />
      </FlexBetween>
      <Paper
        elevation={6}
        sx={{
          backgroundColor: theme.palette.grey[100],
          // m: "0.25rem 1rem 1rem 1rem",
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
          <Paper sx={{ position: "relative", padding: "5px" }}>
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
          </Paper>
          <Box sx={{ flex: 1, marginLeft: "15px" }}>
            {/* {accordionData.map((data, index) => (
              <AccordionComp
                key={index}
                summary={data.accordionSummary}
                id={data.id}
              >
                {data.renderbody()}
              </AccordionComp>
            ))} */}
            {accordionData.map((section) => (
              <AccordionComp
                key={section.id}
                summary={section.label}
                id={`summary-${section.id}`}
              >
                <Grid container spacing={2}>
                  {section.data.map((textField, index) => (
                    <Grid item key={index} xs={12} sm={textField.width}>
                      <TextFieldComp
                        required={textField.required && textField.required}
                        label={textField.label}
                        select={textField.select && textField.select}
                      >
                        {textField.select && textField.renderMenu()}
                      </TextFieldComp>
                    </Grid>
                  ))}
                </Grid>
              </AccordionComp>
            ))}
          </Box>
        </Box>
        <FooterButtons />
      </Paper>
    </Box>
  );
};

export default CreateItem;
