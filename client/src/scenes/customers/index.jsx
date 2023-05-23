import { Box, MenuItem } from "@mui/material";
import { FormComp, Header } from "components";
import { columns } from "data/data";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateCustomerMutation } from "state/api";

const Customers = () => {
  const userId = useSelector((state) => state.global.userId);
  /*   console.log("userId:", userId); */

  const [createCustomer, { isLoading: isCreating }] =
    useCreateCustomerMutation(); //, isError: createError, error: createErrorMessage

  const filteredFields = columns.filter((column) => column.field !== "_id");

  const [formFields, setFormFields] = useState(
    columns.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
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
      if (!userId) {
        /*    console.log("User ID is not set"); */
        return;
      }
      const updatedFormFields = { ...formFields, userId }; // Include the userId in the request payload
      await createCustomer(updatedFormFields).unwrap(); //   console.log("formData:", { customer: formFields, userId: userId }); // Pass the updated formData
      setFormFields(
        columns.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log("submit error", error.response.data.error);
      } else {
        console.log("submit error", error);
      }
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
      {/*       {createError && <>{createErrorMessage.toString()}</>}*/}
    </Box>
  );
};

export default Customers;
