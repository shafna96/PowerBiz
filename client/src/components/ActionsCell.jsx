import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import ModalComp from "./ModalComp";

const ActionsCell = ({
  params,
  handleEditClick,
  handleDeleteClick,
  editOpen,
  setEditOpen,
  filteredFields,
  editFormData,
  setEditFormData,
  isDeleting,
  deleteCustomer,
  setDeletingRow,
  setDeleteOpen,
  deleteOpen,
  deletingRow,
  isEditing,
  editCustomer,
}) => {
  const handleClose = (setState) => () => {
    setState(false);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    if (isDeleting) {
      return;
    }
    try {
      const inactiveCustomer = { ...deletingRow, isActive: false };
      await deleteCustomer(inactiveCustomer._id).unwrap();
      setDeletingRow(null);
      setDeleteOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (isEditing) {
      return;
    }
    try {
      const updatedCustomer = editFormData;
      await editCustomer({
        id: editFormData._id,
        customer: updatedCustomer,
      });
      setEditOpen(false);
      console.log(editFormData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <IconButton
        variant="contained"
        color="secondary"
        onClick={() => handleEditClick(params)}
      >
        <Edit />
      </IconButton>
      <ModalComp
        editModal
        open={editOpen}
        handleClose={handleClose(setEditOpen)}
        data={filteredFields}
        value={editFormData}
        handleChange={(event) => handleEditChange(event)}
        handleEditSubmit={(event) => handleEditSubmit(event)}
      />

      <IconButton
        variant="contained"
        color="secondary"
        onClick={() => handleDeleteClick(params)}
      >
        <Delete />
      </IconButton>
      <ModalComp
        deleteModal
        open={deleteOpen && deletingRow?._id === params.row._id}
        deleteOpen={deleteOpen}
        handleClose={handleClose(setDeleteOpen)}
        handleDeleteSubmit={(event) => handleDeleteSubmit(event)}
      >
        Do you really want to delete this record? This process cannot be undone
        <br />
        <strong>{`name: ${params.row.name}`}</strong>
        <br />
        <strong>{`email: ${params.row.email}`}</strong>
      </ModalComp>
      <IconButton variant="contained" color="secondary" onClick={() => {}}>
        <Visibility />
      </IconButton>
    </Box>
  );
};

export default ActionsCell;
