import { Box, MenuItem } from "@mui/material";
import { FormComp, Header } from "components";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateCustomerMutation } from "state/api";

const Customers = () => {
  const userId = useSelector((state) => state.global.userId);
  console.log("userId:", userId);
  const [createCustomer, { isLoading: isCreating }] =
    useCreateCustomerMutation();
  const columns = [
    {
      field: "_id",
      headerName: "#",
      flex: 0.25,
      renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
    },

    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "customerType",
      headerName: "Customer Type",
      flex: 1,
    },
    {
      field: "contactPerson",
      headerName: "Contact Person",
      flex: 1,
    },
  ];

  const filteredFields = columns.filter((column) => column.field !== "_id");

  const [formFields, setFormFields] = useState(
    filteredFields.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
  );
  const formFieldsRef = useRef(formFields);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    formFieldsRef.current = { ...formFieldsRef.current, [name]: value };
    setFormFields(formFieldsRef.current);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isCreating) {
      return;
    }
    try {
      // const formData = { customer: formFields, userId: userId }; // Include the userId in the request payload
      await createCustomer({ customer: formFields, userId: userId }).unwrap();
      console.log("formData:", { customer: formFields, userId: userId }); // Pass the updated formData
      setFormFields(
        columns.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" /> {/* subTitle="Create Customer" */}
      <FormComp
        data={filteredFields}
        value={formFields}
        handleChange={(event) => handleChange(event)}
        handleSubmit={(event) => handleSubmit(event)}
        option={"customerType"}
        menuItem={[
          <MenuItem key="individual" value="individual">
            Individual
          </MenuItem>,
          <MenuItem key="company" value="company">
            Company
          </MenuItem>,
        ]}
      />
    </Box>
  );
};

export default Customers;
