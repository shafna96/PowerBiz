import {
  Box,
  useTheme,
  Typography,
  IconButton,
  useMediaQuery,
  TextField,
} from "@mui/material";

import {
  ContainedButton,
  FlexBetween,
  FlexEvenly,
  Header,
  OutlinedButton,
  RightDrawer,
  StyledIconButton,
  TabPanel,
  VendorBody,
  VendorHeader,
  VendorTabs,
} from "components";
import React, { useState } from "react";
import { vendorTabs } from "data/data";
import {
  AttachFile,
  Delete,
  Edit,
  Share,
  Summarize,
  Close,
} from "@mui/icons-material";
import {
  selectIsAttachmentOpen,
  selectIsDiaryOpen,
  selectIsSideBarOpen,
  setIsAttachmentOpen,
  setIsDiaryOpen,
  setIsSideBarOpen,
} from "state";
import { useDispatch, useSelector } from "react-redux";
import { useCloseComponent } from "components/useCloseComponent";

const NewVendorBill = () => {
  const theme = useTheme();
  const handleClose = useCloseComponent();
  const dispatch = useDispatch();

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const isSideBarOpen = useSelector(selectIsSideBarOpen);
  // const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const isAttachmentOpen = useSelector(selectIsAttachmentOpen);
  const isDiaryOpen = useSelector(selectIsDiaryOpen);

  const defaultNewItem = {
    itemCode: "",
    itemName: "",
    unitPrice: "",
    quantity: "",
    discount: "",
    tax: "",
  };

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(defaultNewItem);

  const handleAddItem = () => {
    if (
      newItem.itemCode &&
      newItem.itemName &&
      newItem.unitPrice &&
      newItem.quantity &&
      newItem.discount &&
      newItem.tax
    ) {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setNewItem({
        itemCode: "",
        itemName: "",
        unitPrice: "",
        quantity: "",
        discount: "",
        tax: "",
      });
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (event, newValue) => {
    if (newValue) {
      const { itemCode, itemName, unitPrice } = newValue;
      setNewItem({
        itemCode,
        itemName,
        unitPrice,
        quantity: newItem.quantity,
        discount: newItem.discount,
        tax: newItem.tax,
      });
    } else {
      setNewItem(defaultNewItem);
    }
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
      <Box
        sx={{
          overflowY: "auto",
          paddingY: "10px", // Add appropriate spacing
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 200px)", // Set minimum height of the page to 100vh
        }}
      >
        <Typography
          sx={{
            // paddingY: "5px",
            alignItems: "center",
            fontSize: "16px",
          }}
          fontWeight={"bold"}
        >
          Dmas/2023/07/001
        </Typography>

        <Box display={isNonMobile ? "flex" : "block"}>
          <Box
            width={"100%"}
            sx={{
              paddingRight: isAttachmentOpen || isDiaryOpen ? "15px" : 0,
              flexGrow: 1,
              overflowY: "auto",
              maxHeight: "90%",
              flexDirection: "row",
            }}
          >
            {/* <Box> */}
            <Box
              sx={{
                display: "flex",
                borderBottom: "1px solid #ccc",
                marginBottom: "5px",
              }}
            >
              <VendorHeader />
              <Box
                sx={{
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* <Box> */}
                <StyledIconButton onClick={handleDiaryClick}>
                  <Summarize fontSize="50px" />
                </StyledIconButton>
                {/* </Box> */}
                {/* <Box> */}
                <StyledIconButton onClick={handleAttachmentClick}>
                  <AttachFile fontSize="50px" />
                </StyledIconButton>
                {/* </Box> */}
              </Box>
            </Box>
            <VendorTabs
              value={value}
              handleChange={handleTabChange}
              handleChangeIndex={handleTabChangeIndex}
              tabs={vendorTabs}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <VendorBody
                  handleAddItem={handleAddItem}
                  handleDeleteItem={handleDeleteItem}
                  handleInputChange={handleInputChange}
                  handleOptionChange={handleOptionChange}
                  items={items}
                  newItem={newItem}
                />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Box
                  sx={{
                    width: "100%",
                    height: "50dvh",
                  }}
                ></Box>
              </TabPanel>
            </VendorTabs>
            {/* </Box> */}
            <TextField
              multiline
              rows={6}
              name="comments"
              id="comments"
              // value={billNumber}
              label="Comments"
              //   onChange={handleChange(setBillNumber)}
              // variant="standard"
              sx={{ width: "500px", marginY: "25px" }}
              size="small"
              // fullWidth
              color="textfield"
            />
          </Box>

          {isAttachmentOpen && (
            <RightDrawer
              wrapperWidth={"100%"}
              open={isAttachmentOpen}
              onClose={handleAttachmentClick}
              isNonMobile={isNonMobile}
            >
              <Typography>attachment</Typography>
            </RightDrawer>
          )}
          {isDiaryOpen && (
            <RightDrawer
              wrapperWidth={"50%"}
              open={isDiaryOpen}
              onClose={handleDiaryClick}
              isNonMobile={isNonMobile}
            >
              <Typography>Diary</Typography>
            </RightDrawer>
          )}
        </Box>
      </Box>
      <FlexBetween
        sx={{
          position: "sticky",
          padding: "10px 0px 0px 0px",
          borderTop: "1px solid #ccc",
          backgroundColor: "white",
          zIndex: 2,
          //    marginTop: "auto",
          bottom: 2,
        }}
      >
        <FlexEvenly sx={{ width: "285px" }}>
          <OutlinedButton
            sx={{ width: "90px" }}
            variant="outlined"
            startIcon={<Edit />}
          >
            Edit
          </OutlinedButton>

          <OutlinedButton
            sx={{ width: "90px" }}
            variant="outlined"
            startIcon={<Delete />}
          >
            Delete
          </OutlinedButton>
          <OutlinedButton
            sx={{ width: "90px" }}
            variant="outlined"
            startIcon={<Share />}
          >
            Share
          </OutlinedButton>
        </FlexEvenly>
        <FlexBetween sx={{ width: "165px" }}>
          <ContainedButton sx={{ width: "80px" }}>Save</ContainedButton>

          <ContainedButton sx={{ width: "80px" }}>Approve</ContainedButton>
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default NewVendorBill;
