import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ConfirmDialog({
  title = null,
  children = null,
  cancelText = "Zrušit",
  confirmText = "OK",
  onCancel = () => {
    console.log("Cancel");
  },
  onConfirm = () => {
    console.log("Confirm");
  },
  cancelProps = {},
  confirmProps = {},
}) {
  console.log('confirmProps', confirmProps);
  return (
      <Dialog
        open={true}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {cancelText && (
            <Button onClick={onCancel} {...cancelProps}>
              {cancelText}
            </Button>
          )}
          {confirmText && (
            <Button onClick={onConfirm} variant="contained" color="primary" autoFocus {...confirmProps}>
              {confirmText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
  );
}
