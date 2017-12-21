import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const DeleteAlert = ({ open, onClose, onDelete }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={onClose}
    />,
    <FlatButton
      label="Delete"
      primary={true}
      onClick={onDelete}
    />,
  ];
  
  return (
    <Dialog
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={onClose}
    >
      Are you sure you want to destroy this collection ?
    </Dialog>
  );
};

export default DeleteAlert;