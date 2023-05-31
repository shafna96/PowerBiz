import React, { useRef, useState } from "react";
import { Box, MenuItem } from "@mui/material";
import { DataGridComp, FormComp, Header } from "components";
import ActionsCell from "components/ActionsCell";
import { customerColumns } from "data/data";
import { useSelector } from "react-redux";
import {
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useEditCustomerMutation,
  useGetCustomersQuery,
} from "state/api";

const Customers = () => {
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetCustomersQuery({ isActive: true });
  //isError, error

  const [
    createCustomer,
    { isLoading: isCreating, isError: createError, error: createErrorMessage },
  ] = useCreateCustomerMutation(); //, isError: createError, error: createErrorMessage
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [editCustomer] = useEditCustomerMutation();
  console.log("errorMsg:", createErrorMessage?.data?.error);
  const filteredFields = customerColumns.filter(
    (column) => column.field !== "_id"
  );

  const [formFields, setFormFields] = useState(
    customerColumns.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
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
        return;
      }
      const updatedFormFields = { ...formFields, userId }; // Include the userId in the request payload
      await createCustomer(updatedFormFields).unwrap(); //   console.log("formData:", { customer: formFields, userId: userId }); // Pass the updated formData
      setFormFields(
        customerColumns.reduce(
          (acc, { field }) => ({ ...acc, [field]: "" }),
          {}
        )
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log("submit error", error.response.data.error);
      } else {
        console.log("submit error", error);
      }
    }
  };

  const filteredColumns = [
    ...customerColumns,

    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <ActionsCell
          params={params}
          filteredFields={filteredFields}
          editMutation={editCustomer}
          deleteMutation={deleteCustomer}
          entity="customer"
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
      ),
    },
  ];

  const activeCustomers = data
    ? data.filter((customer) => customer.isActive)
    : [];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subTitle="Create Customer" />
      <FormComp
        data={filteredFields}
        value={formFields}
        handleChange={(event) => handleChange(event)}
        handleSubmit={(event) => handleSubmit(event)}
        option={"customerType"}
        //error={createError}
        // helperText={createErrorMessage?.data?.error}
        menuItem={[
          <MenuItem key="individual" value="individual">
            Individual
          </MenuItem>,
          <MenuItem key="company" value="company">
            Company
          </MenuItem>,
        ]}
      />
      <DataGridComp
        subTitle="Customer Table"
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={activeCustomers}
        columns={filteredColumns}
      />
    </Box>
  );
};

export default Customers;
