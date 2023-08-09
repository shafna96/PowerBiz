import { MenuItem, Typography } from "@mui/material";
import { Box, Grid, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useGetSuppliersQuery } from "state/api";

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
  const [selectedDate, setSelectedDate] = useState("");
  const [billNumber, setBillNumber] = useState("");
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
    <Box position={"sticky"}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container rowGap={1}>
          <Grid item sm={6} paddingX={"5px"}>
            <TextField
              required
              name="vendor"
              id="vendor"
              value={selectedVendor}
              label="Vendor"
              onChange={handleChange(setSelectedVendor)}
              variant="standard"
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
          </Grid>
          <Grid item sm={6} paddingX={"5px"} rowGap={1}>
            <TextField
              required
              name="billDate"
              id="billDate"
              value={selectedDate}
              label="Bill Date"
              onChange={handleChange(setSelectedDate)}
              variant="standard"
              sx={{ width: "85%" }}
              //fullWidth
              color="textfield"
            />
            <TextField
              required
              name="billNo"
              id="billNo"
              value={billNumber}
              label="Reference No"
              onChange={handleChange(setBillNumber)}
              variant="standard"
              sx={{ width: "85%", paddingBottom: "5px" }}
              // fullWidth
              color="textfield"
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default VendorHeader;
