import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
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
  //  const fileInputRef = useRef(formFields.image); // Ref to access the file input element
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    formFieldsRef.current = { ...formFieldsRef.current, [name]: value };
    setFormFields(formFieldsRef.current);
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    const { name, files } = event.target;
    formFieldsRef.current = { ...formFieldsRef.current, [name]: files[0] };
    setFormFields(formFieldsRef.current);
    console.log("img", files[0]);
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

      const updatedFormFields = {
        ...formFieldsRef.current,
        userId,
      }; // Include the userId in the request payload

      const formData = new FormData();
      Object.entries(updatedFormFields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await createItem(formData).unwrap(); //   console.log("formData:", { customer: formFields, userId: userId }); // Pass the updated formData
      console.log("frontendSubmit", formData);

      // setFormFields(
      //   itemColumns.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
      // );
      // Clear form fields using formFieldsRef
      const clearedFormFields = itemColumns.reduce(
        (acc, { field }) => ({ ...acc, [field]: "" }),
        {}
      );
      formFieldsRef.current = clearedFormFields;
      setFormFields(clearedFormFields);

      // Reset file input value to clear it
      // if (fileInputRef.current) {
      //   fileInputRef.current.value = "";
      // }
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
    <Box>
      <Header title="Items" subTitle="Create Item" />
      <FormComp
        data={filteredFields}
        value={formFields}
        handleChange={(event) => handleChange(event)}
        handleImageChange={(event) => handleImageChange(event)}
        handleSubmit={(event) => handleSubmit(event)}
        comment={"comments"}
        image={"image"}
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
