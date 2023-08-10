import {
  Box,
  useTheme,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
  Button,
} from "@mui/material";

import {
  FlexBetween,
  Header,
  TabPanel,
  VendorBody,
  VendorHeader,
  VendorTabs,
} from "components";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { vendorTabs } from "data/data";
import { useNavigate } from "react-router-dom";
import { AttachFile, Summarize } from "@mui/icons-material";
import {
  selectIsAttachmentOpen,
  selectIsDiaryOpen,
  selectIsSideBarOpen,
  setIsAttachmentOpen,
  setIsDiaryOpen,
  setIsSideBarOpen,
} from "state";
import { useDispatch, useSelector } from "react-redux";

const NewVendorBill = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const isSideBarOpen = useSelector(selectIsSideBarOpen);
  // const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const isAttachmentOpen = useSelector(selectIsAttachmentOpen);
  const isDiaryOpen = useSelector(selectIsDiaryOpen);

  const handleClose = () => {
    navigate(-1);
    // Add your logic here to handle closing the VendorBill component
  };
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setValue(index);
  };
  const handleAttachmentClick = () => {
    dispatch(setIsAttachmentOpen(!isAttachmentOpen)); // Toggle the isAttachmentOpen state when clicking on "Attachment"
    if (isSideBarOpen || isDiaryOpen) {
      dispatch(setIsSideBarOpen(false)); // Close the attachment when the sidebar is opened
      dispatch(setIsDiaryOpen(false));
    }
  };

  const handleDiaryClick = () => {
    dispatch(setIsDiaryOpen(!isDiaryOpen)); // Toggle the isAttachmentOpen state when clicking on "Attachment"
    if (isSideBarOpen || isAttachmentOpen) {
      dispatch(setIsSideBarOpen(false)); // Close the attachment when the sidebar is opened
      dispatch(setIsAttachmentOpen(false)); // Close the attachment when the sidebar is opened
    }
  };

  return (
    <Box>
      <Header title={"New Vendor Bill"} />

      <Box position="relative" display={isNonMobile ? "flex" : "block"}>
        <Box
          width={"100%"}
          sx={{
            paddingRight: "15px",
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "100vh",
            flexDirection: "row",
          }}
        >
          {/* <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}></Box>
            <Box>
              <IconButton
                onClick={handleDiaryClick}
                //size="small"
                sx={{
                  backgroundColor: theme.palette.primary[200],
                  color: "white",
                  margin: "2px",
                }}
              >
                <Summarize fontSize="50px" />
              </IconButton>
              <IconButton
                onClick={handleAttachmentClick}
                //  size="large"
                sx={{
                  backgroundColor: theme.palette.primary[200],
                  color: "white",
                  margin: "2px",
                }}
              >
                <AttachFile fontSize="50px" />
              </IconButton>
            </Box>
          </Box> */}

          <Box>
            <VendorTabs
              value={value}
              handleChange={handleTabChange}
              handleChangeIndex={handleTabChangeIndex}
              tabs={vendorTabs}
              sideButtons={
                <Box>
                  <IconButton
                    onClick={handleDiaryClick}
                    //size="small"
                    sx={{
                      backgroundColor: theme.palette.primary[200],
                      color: "white",
                      margin: "2px",
                    }}
                  >
                    <Summarize fontSize="50px" />
                  </IconButton>
                  <IconButton
                    onClick={handleAttachmentClick}
                    //  size="large"
                    sx={{
                      backgroundColor: theme.palette.primary[200],
                      color: "white",
                      margin: "2px",
                    }}
                  >
                    <AttachFile fontSize="50px" />
                  </IconButton>
                </Box>
              }
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Box
                  sx={{
                    // paddingX: "25px",
                    //  marginBottom: "40px",
                    backgroundColor: theme.palette.primary.light,
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          paddingX: "15px",
                          paddingY: "5px",

                          alignItems: "center",
                        }}
                        fontWeight={"bold"}
                      >
                        mas/2023/07/001
                      </Typography>
                    </Box>
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
                      <CloseIcon
                        sx={{
                          color: "white",
                          fontSize: "16px", // Adjust the font size of the icon as needed
                        }}
                      />
                    </IconButton>
                    {/* </IconButton> */}
                  </Box>

                  <Box
                    sx={{
                      // position: "relative",
                      // paddingX: "25px",
                      //  maxHeight: "calc(100vh - 200px)", // Adjust the height based on your layout
                      //   overflowY: "auto",
                      //marginBottom: "10px", // This will create space for the fixed bottom buttons
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: "72dvh",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        overflowY: "auto",
                        padding: "16px",
                      }}
                    >
                      <VendorHeader />

                      <VendorBody />
                    </Box>
                    <Box
                      //  position={"fixed"}
                      // className="fixed-bottom-div"
                      sx={{
                        position: "sticky",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        paddingRight: "2%",
                        paddingY: "10px",
                        borderTop: "1px solid #ccc",
                        flexShrink: 0,
                      }}
                    >
                      <Box sx={{ flex: 1 }}></Box>
                      <Box
                        sx={{
                          flexDirection: "column",
                          alignItems: "flex-end",
                          width: "150px",
                        }}
                      >
                        <FlexBetween>
                          <Button
                            sx={{
                              backgroundColor: theme.palette.secondary.dark,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            Save
                          </Button>

                          <Button
                            sx={{
                              backgroundColor: theme.palette.secondary.dark,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            Confirm
                          </Button>
                        </FlexBetween>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Box
                  sx={{
                    // paddingX: "25px",
                    //  marginTop: "40px",
                    backgroundColor: theme.palette.primary.light,
                  }}
                ></Box>
              </TabPanel>
            </VendorTabs>
          </Box>
        </Box>
        {isAttachmentOpen && (
          <Box width={"100%"}>
            <Drawer
              open={isAttachmentOpen}
              onClose={handleAttachmentClick}
              variant="persistent"
              anchor="right"
              sx={{
                //    width: "50%", //drawerWidth,

                "& .MuiDrawer-paper": {
                  color: theme.palette.secondary[200],
                  backgroundColor: theme.palette.background.alt,
                  boxSizing: "border-box",
                  borderWidth: isNonMobile ? 0 : "2px",
                },
              }}
            />
            <Box
              sx={{
                // backgroundColor: "green",
                borderLeft: 1,
                width: "100%",
                height: "80vh",
                padding: "10px",
              }}
            >
              <Typography>attachment</Typography>
            </Box>
          </Box>
        )}
        {isDiaryOpen && (
          <Box>
            <Drawer
              open={isDiaryOpen}
              onClose={handleDiaryClick}
              variant="persistent"
              anchor="right"
              sx={{
                //    width: "50%", //drawerWidth,

                "& .MuiDrawer-paper": {
                  color: theme.palette.secondary[200],
                  backgroundColor: theme.palette.background.alt,
                  boxSizing: "border-box",
                  borderWidth: isNonMobile ? 0 : "2px",
                },
              }}
            />
            <Box
              sx={{
                // backgroundColor: "green",
                borderLeft: 1,
                width: "100%",
                height: "80vh",
                padding: "10px",
              }}
            >
              <Typography>Diary</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewVendorBill;
