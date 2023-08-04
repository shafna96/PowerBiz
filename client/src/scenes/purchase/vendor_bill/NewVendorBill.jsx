import {
  Box,
  useTheme,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import {
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
import { AttachFile } from "@mui/icons-material";
import {
  selectIsAttachmentOpen,
  selectIsSideBarOpen,
  setIsAttachmentOpen,
  setIsSideBarOpen,
} from "state";
import { useDispatch, useSelector } from "react-redux";

const NewVenderBill = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  // const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const isAttachmentOpen = useSelector(selectIsAttachmentOpen);

  const isSideBarOpen = useSelector(selectIsSideBarOpen);

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
    if (isSideBarOpen) {
      dispatch(setIsSideBarOpen(false)); // Close the attachment when the sidebar is opened
    }
  };

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1 }}></Box>
          <Box
            sx={{
              marginRight: "50px",
            }}
          >
            <IconButton
              onClick={handleAttachmentClick}
              size="large"
              sx={{
                backgroundColor: theme.palette.primary[200],
                color: "white",
              }}
            >
              <AttachFile fontSize="50px" />
            </IconButton>
          </Box>
        </Box>

        <Box m="1.5rem 2.5rem">
          <VendorTabs
            value={value}
            handleChange={handleTabChange}
            handleChangeIndex={handleTabChangeIndex}
            tabs={vendorTabs}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Box
                sx={{
                  // paddingX: "25px",
                  //  marginTop: "40px",
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
                <Box sx={{ padding: "25px" }}>
                  <Header title={"Vendor Bill"} />
                  <VendorHeader />
                  <VendorBody />
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
        <Box width={"50%"}>
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
              height: "100dvh",
              padding: "10px",
            }}
          >
            <Typography>attachment</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NewVenderBill;
