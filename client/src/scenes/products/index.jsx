import React, { useRef, useState } from "react";
import { Box, MenuItem } from "@mui/material";
import { DataGridComp, FormComp, Header } from "components";
import ActionsCell from "components/ActionsCell";
import { itemColumns } from "data/data";
import { useSelector } from "react-redux";
import {
  useCreateItemMutation,
  useDeleteItemMutation,
  useEditItemMutation,
  useGetItemsQuery,
} from "state/api";

const Products = () => {
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetItemsQuery({ isActive: true });

  const [deleteItem] = useDeleteItemMutation();
  const [editItem] = useEditItemMutation();

  const activeItems = data ? data.filter((item) => item.isActive) : [];

  const [createItem, { isLoading: isCreating }] = useCreateItemMutation();

  const filteredFields = itemColumns.filter((column) => column.field !== "_id");

  const [formFields, setFormFields] = useState(
    itemColumns.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
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
      await createItem(updatedFormFields).unwrap(); //   console.log("formData:", { customer: formFields, userId: userId }); // Pass the updated formData
      setFormFields(
        itemColumns.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
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
    ...itemColumns.filter((column) => column.field !== "comments"),

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
          editMutation={editItem}
          deleteMutation={deleteItem}
          entity="item"
        />
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Items" subTitle="Create Item" />
      <FormComp
        data={filteredFields}
        value={formFields}
        handleChange={(event) => handleChange(event)}
        handleSubmit={(event) => handleSubmit(event)}
        comment={"comments"}
      />
      <DataGridComp
        subTitle="Item Table"
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={activeItems}
        columns={filteredColumns}
      />
    </Box>
  );
};

export default Products;
