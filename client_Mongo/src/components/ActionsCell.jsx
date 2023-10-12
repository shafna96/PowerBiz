import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Slide,
} from "@mui/material";
import React, { useState } from "react";
import FormComp from "./FormComp";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActionsCell = ({
  params,
  editMutation,
  deleteMutation,
  filteredFields,
  entity,
  option,
  menuItem,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editFormData, setEditFormData] = useState(params.row);
  const [deletingRow, setDeletingRow] = useState(params.row);
  const handleClose = (setState) => () => {
    setState(false);
  };

  const handleClick = (setState) => () => {
    setState(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedData = editFormData;
      await editMutation({
        id: editFormData._id,
        [entity]: updatedData,
      });
      setEditOpen(false);
      console.log(editFormData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();

    try {
      await deleteMutation(deletingRow._id).unwrap();
      console.log(deletingRow._id);
      setDeletingRow(null);
      setDeleteOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <IconButton
        variant="contained"
        color="secondary"
        //onClick={() => handleEditClick(params)}
        onClick={handleClick(setEditOpen)}
      >
        <Edit />
      </IconButton>

      <Modal
        open={editOpen}
        onClose={handleClose(setEditOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormComp
            edit
            data={filteredFields}
            value={editFormData}
            handleChange={(event) => handleEditChange(event)}
            handleSubmit={(event) => handleEditSubmit(event)}
            option={option}
            menuItem={menuItem}
          />
        </Box>
      </Modal>
      <IconButton
        variant="contained"
        color="secondary"
        //  onClick={() => handleDeleteClick(params)}
        onClick={handleClick(setDeleteOpen)}
      >
        <Delete />
      </IconButton>

      <Modal
        open={deleteOpen && deletingRow?._id === params.row._id}
        onClose={handleClose(setDeleteOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Dialog
            open={deleteOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose(setDeleteOpen)}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Confirm delete"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Do you really want to delete this record? This process cannot be
                undone
                <br />
                <strong>{`name: ${params.row.name}`}</strong>
                <br />
                <strong>{`email: ${params.row.email}`}</strong>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose(setDeleteOpen)}>Cancel</Button>
              <Button onClick={(event) => handleDeleteSubmit(event)}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Modal>
      <IconButton variant="contained" color="secondary" onClick={() => {}}>
        <Visibility />
      </IconButton>
    </Box>
  );
};

export default ActionsCell;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  p: 4,
};
