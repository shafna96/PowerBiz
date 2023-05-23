import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Box, IconButton, MenuItem, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FormComp, Header } from "components";
import ActionsCell from "components/ActionsCell";
import FilteredColums from "components/ActionsCell";
import ModalComp from "components/ModalComp";
import { columns } from "data/data";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useEditCustomerMutation,
  useGetCustomersQuery,
} from "state/api";

const Customers = () => {
  const theme = useTheme();

  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetCustomersQuery({ isActive: true });
  //isError, error

  const activeCustomers = data
    ? data.filter((customer) => customer.isActive)
    : [];

  const [createCustomer, { isLoading: isCreating }] =
    useCreateCustomerMutation(); //, isError: createError, error: createErrorMessage

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteCustomer, { isLoading: isDeleting }] =
    useDeleteCustomerMutation();
  const [editCustomer, { isLoading: isEditing }] = useEditCustomerMutation();

  const [editFormData, setEditFormData] = useState({});
  const [deletingRow, setDeletingRow] = useState(null);

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
  const handleEditClick = (params) => {
    console.log(params.row);
    setEditFormData(params.row);
    setEditOpen(true);
  };

  const handleDeleteClick = (params) => {
    setDeletingRow(params.row);
    console.log(params.row);
    setDeleteOpen(true);
  };

  const filteredColumns = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <ActionsCell
          params={params}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          filteredFields={filteredFields}
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          isDeleting={isDeleting}
          deleteCustomer={deleteCustomer}
          setDeletingRow={setDeletingRow}
          setDeleteOpen={setDeleteOpen}
          deleteOpen={deleteOpen}
          deletingRow={deletingRow}
          isEditing={isEditing}
          editCustomer={editCustomer}
        />
      ),
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subTitle="Create Customer" /> {/* */}
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
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <Header subTitle="Customer Table" /> {/*  */}
        <DataGrid
          sx={{ marginTop: "40px" }}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={activeCustomers}
          columns={filteredColumns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
