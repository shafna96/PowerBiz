import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Slide,
} from "@mui/material";
import React from "react";
import FormComp from "./FormComp";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalComp = ({
  open,
  handleClose,
  children,
  editModal,
  deleteModal,
  deleteOpen,
  handleDeleteSubmit,
  data,
  value,
  handleChange,
  handleEditSubmit,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title" //{ariaLabelledby}
      aria-describedby="modal-modal-description" //{ariaDescribedbyModal}
    >
      <Box sx={style}>
        {deleteModal && (
          <Dialog
            open={deleteOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description" // {ariaDescribedbyDialog}
          >
            <DialogTitle>{"Confirm delete"}</DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description" //{contentId}
              >
                {children}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDeleteSubmit}>Delete</Button>
            </DialogActions>
          </Dialog>
        )}
        {editModal && (
          <FormComp
            edit
            data={data}
            value={value}
            handleChange={handleChange}
            handleSubmit={handleEditSubmit}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ModalComp;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  p: 4,
};
