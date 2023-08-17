import React, { useState } from "react";
import { MenuItem, Typography, Box, TextField } from "@mui/material";
import { useGetSuppliersQuery } from "state/api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { FlexBetween } from "components";
import { currencyOptions } from "data/data";

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
      sx={{
        flex: 1,
      }}
    >
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Box sx={{ display: "flex", padding: "15px" }}>
          <Box sx={{ flex: 0.4 }}>
            <TextFieldComp
              required
              nameId="vendor"
              value={selectedVendor}
              label="Vendor"
              onChange={handleChange(setSelectedVendor)}
              width="50%"
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
            </TextFieldComp>
            <Box>
              {showVendorDetails && renderVendorDetails(selectedVendor)}
            </Box>
          </Box>
          <Box sx={{ flex: 0.2 }}>
            <DatePickerComponent
              required
              nameId="billDate"
              value={selectedBillDate}
              label="Bill Date"
              //  defaultValue={dayjs("2023-08-15")}
              onChange={(newValue) => setSelectedBillDate(newValue)}
            />
            <DatePickerComponent
              required
              nameId="dueDate"
              value={selectedDueDate}
              label="Due Date"
              //  defaultValue={dayjs("2023-08-15")}
              onChange={(newValue) => setSelectedDueDate(newValue)}
            />
          </Box>

          <Box sx={{ flex: 0.4 }}>
            <TextFieldComp
              required
              nameId="billNo"
              value={billNumber}
              label="Supplier Ref No"
              onChange={handleChange(setBillNumber)}
              width="60%"
            />
            <FlexBetween>
              <TextFieldComp
                required
                nameId="segment"
                value={segment}
                label="Segment"
                onChange={handleChange(setSegment)}
                width="60%"
              />
              <TextFieldComp
                required
                nameId="currency"
                value={currency}
                label="Currency"
                onChange={handleChange(setCurrency)}
                width="20%"
                select
              >
                {currencyOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextFieldComp>
            </FlexBetween>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default VendorHeader;

const TextFieldComp = (props) => {
  const { value, label, onChange, width, select, children, nameId } = props;
  return (
    <TextField
      {...props}
      name={nameId}
      id={nameId}
      value={value}
      label={label}
      onChange={onChange}
      variant="standard"
      size="small"
      // fullWidth
      sx={{ width: width }}
      color="textfield"
      select={select}
    >
      {select && children}
    </TextField>
  );
};

const DatePickerComponent = (props) => {
  const { value, label, onChange, nameId, defaultValue } = props;

  return (
    <Box>
      <DatePicker
        {...props}
        name={nameId}
        id={nameId}
        value={value}
        label={label}
        defaultValue={defaultValue}
        onChange={onChange}
        slotProps={{
          textField: {
            variant: "standard",
            size: "small",
            //width: "85%",
          },
        }}
        sx={{ width: "50%" }}
        color="textfield"
      />
    </Box>
  );
};
