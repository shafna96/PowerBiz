import { Add, Close } from "@mui/icons-material";
import ReactFileReader from "react-file-reader";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  useTheme,
} from "@mui/material";
import {
  AccordionComp,
  ContainedButton,
  FlexBetween,
  FooterButtons,
  Header,
  TextFieldComp,
} from "components";
import { useCloseComponent } from "components/useCloseComponent";
import { currencyOptions } from "data/data";
import React, { useState } from "react";

const CreateVendor = () => {
  const theme = useTheme();
  const handleClose = useCloseComponent();

  const [url, setUrl] = useState(
    "https://w7.pngwing.com/pngs/235/452/png-transparent-cloud-upload-upload-cloud-file-storage-project-management-icon-thumbnail.png"
  );

  const handleFiles = (files) => {
    console.log(files);
    setUrl(files.base64);
  };
  const [individualChecked, setIndividualChecked] = useState(true);
  const [companyChecked, setCompanyChecked] = useState(false);
  const handleIndividualChange = () => {
    setIndividualChecked(!individualChecked);
    if (companyChecked) {
      setCompanyChecked(false);
    }
  };

  const handleCompanyChange = () => {
    setCompanyChecked(!companyChecked);
    if (individualChecked) {
      setIndividualChecked(false);
    }
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
        <Header title={"New Vendor"} sx={{ paddingLeft: "1rem" }} />
      </FlexBetween>
      <Paper
        elevation={6}
        sx={{
          backgroundColor: theme.palette.grey[100],
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
            padding: "1rem",
            overflowY: "auto",
            paddingY: "10px", // Add appropriate spacing
            display: "flex",
            // flexDirection: "column",
            minHeight: "calc(100vh - 240px)", // Set minimum height of the page to 100vh
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
            <Paper sx={{ padding: "1rem" }}>
              <Grid container gap={2}>
                <Grid item xs={6} justifyContent="space-between" container>
                  <Grid item xs={3}>
                    <TextFieldComp id="vendor_id" label="Vendor Id" />
                  </Grid>
                  <Grid item xs={2}>
                    <TextFieldComp id="currency" label="currency" select>
                      {currencyOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextFieldComp>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        color="secondary"
                        checked={individualChecked}
                        onChange={handleIndividualChange}
                        name="individual"
                      />
                    }
                    label="Individual"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={companyChecked}
                        onChange={handleCompanyChange}
                        name="company"
                      />
                    }
                    label="Company"
                  />
                </Grid>
                <Grid item container xs={10} justifyContent="space-between">
                  <Grid item xs={5}>
                    <Grid item container direction={"row"} spacing={0.5}>
                      <Grid item>
                        <TextFieldComp
                          // width="50px"
                          id="title-select"
                          defaultValue={"Mr."}
                          select
                          label="Title"
                          //  onChange={(e) => setTitle(e.target.value)}
                        >
                          <MenuItem value={"Mr."}>Mr.</MenuItem>
                          <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                          <MenuItem value={"Mss."}>Mss.</MenuItem>
                        </TextFieldComp>
                      </Grid>
                      <Grid item xs={10.5}>
                        <TextFieldComp id="vendor_name" label="Vendor Name" />
                      </Grid>
                    </Grid>
                    <TextFieldComp
                      id="address"
                      label="Address"
                      multiline
                      rows={4}
                    />
                    <TextFieldComp id="other_Name" label="Other Name" />
                  </Grid>
                  <Grid item xs={3}>
                    <TextFieldComp id="mobile" label="Mobile" />
                    <TextFieldComp id="fax" label="Fax" />
                    <TextFieldComp id="email" label="Email" />
                    <TextFieldComp id="website" label="Website" />
                  </Grid>
                  <Grid item xs={2} justifyContent="space-between" container>
                    <TextFieldComp id="due-in" label="Due In" width="100px" />
                    <Grid item>
                      <Button
                        variant="outlined"
                        startIcon={<Add />}
                        color="primary"
                        sx={{
                          //color: theme.palette.primary[300],
                          //  borderColor: theme.palette.primary[300],
                          height: "30px",
                          // textDecoration: "underline",
                        }}
                      >
                        Contact Person
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} container>
                  <Grid
                    item
                    xs={8}
                    direction="row"
                    justifyContent="space-between"
                    container
                  >
                    <Grid item xs={5}>
                      <TextFieldComp id="nic" label="NIC" />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    direction="row"
                    justifyContent="space-between"
                    container
                  >
                    <Grid item xs={5}>
                      <TextFieldComp id="vat" label="VAT" />
                    </Grid>
                    <Grid item xs={5}>
                      <TextFieldComp id="tag" label="Tag" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <AccordionComp
              summary="contact Details"
              id="contact_details"
            ></AccordionComp>
            <AccordionComp summary="Bank Details" id="bank_details">
              <Grid container xs={8} justifyContent="space-around">
                <Grid item xs={5}>
                  <TextFieldComp id="bank_name" label="Name" />
                  <TextFieldComp id="branch" label="Branch" />
                  <TextFieldComp id="acc_no" label="Account No" />
                </Grid>
                <Grid item xs={5}>
                  <TextFieldComp id="bank_code" label="Bank Code" />
                  <TextFieldComp id="branch_code" label="Branch Code" />
                </Grid>
              </Grid>
            </AccordionComp>
            {/* <Paper sx={{ padding: "1rem", marginTop: "1rem" }}>
              sdjshdjshd
            </Paper> */}
          </Box>
        </Box>
        <FooterButtons />
      </Paper>
    </Box>
  );
};

export default CreateVendor;
