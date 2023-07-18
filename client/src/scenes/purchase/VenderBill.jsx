import { Box } from "@mui/material";
import { VendorFormComp, Header } from "components";
import { vendorbillFields } from "data/data";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSuppliersQuery } from "state/api";

const VenderBill = () => {
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetSuppliersQuery({ isActive: true });
  const [formFields, setFormFields] = useState(
    vendorbillFields.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
  );

  const formFieldsRef = useRef(formFields);
  //  const fileInputRef = useRef(formFields.image); // Ref to access the file input element
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    formFieldsRef.current = { ...formFieldsRef.current, [name]: value };
    setFormFields(formFieldsRef.current);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Vendor Bill" />
      <VendorFormComp />
    </Box>
  );
};

export default VenderBill;
