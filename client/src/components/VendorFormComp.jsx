import { MenuItem, Select } from "@mui/material";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSuppliersQuery } from "state/api";

const VendorformComp = ({ handleSubmit }) => {
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetSuppliersQuery({ isActive: true });

  const activeSuppliers = data
    ? data.filter((supplier) => supplier.isActive)
    : [];
  //   const vendors = activeSuppliers
  //     ? activeSuppliers.map((supplier) => supplier.name)
  //     : [];
  console.log("data", data);
  // console.log("vendor", vendors);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [billNumber, setBillNumber] = useState("");
  const [showVendorDetails, setShowVendorDetails] = useState(false);
  const theme = useTheme();

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
        <p>{`Name: ${vendorDetails.name}`}</p>
        <p>{`Address: ${vendorDetails.address}`}</p>
        <p>{`Phone Number: ${vendorDetails.phone}`}</p>
        <p>{`Vendor Number: ${vendorDetails._id}`}</p>
      </Box>
    );
  };
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Grid
        container
        rowGap={1}
        sx={{
          padding: "25px",
          marginTop: "40px",
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Grid item sm={6} padding={"5px"}>
          <TextField
            required
            name="vendor"
            id="vendor"
            value={selectedVendor}
            label="Vendor"
            onChange={handleChange(setSelectedVendor)}
            variant="outlined"
            fullWidth
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
          <Box>{showVendorDetails && renderVendorDetails(selectedVendor)}</Box>
        </Grid>
        <Grid item sm={6} padding={"5px"} rowGap={1}>
          <TextField
            required
            name="billDate"
            id="billDate"
            value={selectedDate}
            label="Bill Date"
            onChange={handleChange(setSelectedDate)}
            variant="outlined"
            fullWidth
            color="textfield"
          />
          <TextField
            required
            name="billNo"
            id="billNo"
            value={billNumber}
            label="Bill No"
            onChange={handleChange(setBillNumber)}
            variant="outlined"
            fullWidth
            color="textfield"
            sx={{ paddingTop: "5px" }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default VendorformComp;
