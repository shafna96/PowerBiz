import React, { useRef, useState } from "react";
import { Box, MenuItem } from "@mui/material";
import { DataGridComp, FormComp, Header } from "components";
import ActionsCell from "components/ActionsCell";
import { supplierColumns } from "data/data";
import { useSelector } from "react-redux";
import {
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useEditSupplierMutation,
  useGetSuppliersQuery,
} from "state/api";

const Suppliers = () => {
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetSuppliersQuery({ isActive: true });

  const [deleteSupplier] = useDeleteSupplierMutation();
  const [editSupplier] = useEditSupplierMutation();

  const activeSuppliers = data
    ? data.filter((supplier) => supplier.isActive)
    : [];

  const [createSupplier, { isLoading: isCreating }] =
    useCreateSupplierMutation();

  const filteredFields = supplierColumns.filter(
    (column) => column.field !== "_id"
  );

  const [formFields, setFormFields] = useState(
    supplierColumns.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
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
      await createSupplier(updatedFormFields).unwrap(); //   console.log("formData:", { customer: formFields, userId: userId }); // Pass the updated formData
      setFormFields(
        supplierColumns.reduce(
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
    ...supplierColumns,
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
          editMutation={editSupplier}
          deleteMutation={deleteSupplier}
          entity="supplier"
          option={"supplierType"}
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

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SUPPLIERS" subTitle="Create Supplier" /> {/* */}
      <FormComp
        data={filteredFields}
        value={formFields}
        handleChange={(event) => handleChange(event)}
        handleSubmit={(event) => handleSubmit(event)}
        option={"supplierType"}
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
        subTitle="Supplier Table"
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={activeSuppliers}
        columns={filteredColumns}
      />
    </Box>
  );
};

export default Suppliers;
