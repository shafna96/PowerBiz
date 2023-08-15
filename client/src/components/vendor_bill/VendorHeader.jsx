import React, { useState } from "react";
import { MenuItem, Typography, Box, TextField } from "@mui/material";
import { useGetSuppliersQuery } from "state/api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { FlexBetween } from "components";

const VendorHeader = ({ handleSubmit }) => {
  const { data } = useGetSuppliersQuery({ isActive: true });

  const activeSuppliers = data
    ? data.filter((supplier) => supplier.isActive)
    : [];
  //   const vendors = activeSuppliers
  //     ? activeSuppliers.map((supplier) => supplier.name)
  //     : [];
  console.log("data", data);
  // console.log("vendor", vendors);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedBillDate, setSelectedBillDate] = useState(null);
  const [selectedDueDate, setSelectedDueDate] = useState(null);

  const [billNumber, setBillNumber] = useState("");
  const [segment, setSegment] = useState("");
  const [currency, setCurrency] = useState("");
  const [showVendorDetails, setShowVendorDetails] = useState(false);

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const renderVendorDetails = (vendor) => {
    const vendorDetails = activeSuppliers.find(
      (supplier) => supplier._id === vendor
    );
    if (!vendorDetails) return null;

    return (
      <Box>
        <Typography
          sx={{ paddingTop: "10px" }}
        >{`Address: ${vendorDetails.address}`}</Typography>
        <Typography
          sx={{ paddingTop: "5px" }}
        >{`Phone Number: ${vendorDetails.phone}`}</Typography>
        <Typography
          sx={{ paddingTop: "5px" }}
        >{`Vendor Number: ${vendorDetails._id}`}</Typography>
      </Box>
    );
  };
  return (
    <Box
      position={"sticky"}
      sx={{
        flex: 1,
      }}
    >
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Box display={"flex"}>
          <Box sx={{ flex: 1 }}>
            <TextField
              required
              name="vendor"
              id="vendor"
              value={selectedVendor}
              label="Vendor"
              onChange={handleChange(setSelectedVendor)}
              variant="standard"
              size="small"
              // fullWidth
              sx={{ width: "85%" }}
              color="textfield"
              select
            >
              {activeSuppliers.map((vendor, index) => (
                <MenuItem
                  key={index}
                  value={vendor._id}
                  onClick={() => {
                    setShowVendorDetails(true);
                  }}
                >
                  {vendor.name}
                </MenuItem>
              ))}
            </TextField>
            <Box>
              {showVendorDetails && renderVendorDetails(selectedVendor)}
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <FlexBetween width={"85%"}>
              <DatePicker
                required
                name="billDate"
                id="billDate"
                value={selectedBillDate}
                label="Bill Date"
                //  defaultValue={dayjs("2023-08-15")}
                onChange={(newValue) => setSelectedBillDate(newValue)}
                slotProps={{
                  textField: {
                    variant: "standard",
                    size: "small",
                    // width: "85%",
                  },
                }}
                sx={{ width: "45%" }}
                //fullWidth
                color="textfield"
              />
              <DatePicker
                required
                name="dueDate"
                id="dueDate"
                value={selectedDueDate}
                label="Due Date"
                //  defaultValue={dayjs("2023-08-15")}
                onChange={(newValue) => setSelectedDueDate(newValue)}
                slotProps={{
                  textField: {
                    variant: "standard",
                    size: "small",
                    // width: "85%",
                  },
                }}
                sx={{ width: "45%" }}
                //fullWidth
                color="textfield"
              />
            </FlexBetween>
            <TextField
              required
              name="billNo"
              id="billNo"
              value={billNumber}
              label="Reference No"
              onChange={handleChange(setBillNumber)}
              variant="standard"
              sx={{ width: "85%", paddingBottom: "5px" }}
              size="small"
              // fullWidth
              color="textfield"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              required
              name="segment"
              id="segment"
              value={segment}
              label="Segment"
              onChange={handleChange(setSegment)}
              variant="standard"
              sx={{ width: "85%" }}
              size="small"
              //fullWidth
              color="textfield"
            />
            <TextField
              required
              name="currency"
              id="currency"
              value={currency}
              label="Currency"
              onChange={handleChange(setCurrency)}
              variant="standard"
              sx={{ width: "85%", paddingBottom: "5px" }}
              size="small"
              // fullWidth
              color="textfield"
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default VendorHeader;
