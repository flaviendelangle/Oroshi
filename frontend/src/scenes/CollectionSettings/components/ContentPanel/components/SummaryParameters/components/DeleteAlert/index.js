import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const DeleteAlert = ({ open, onClose, onDelete }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onClick={onClose}
    />,
    <FlatButton
      label="Delete"
      primary
      onClick={onDelete}
    />,
  ];

  return (
    <Dialog
      actions={actions}
      open={open}
      onRequestClose={onClose}
    >
      Are you sure you want to destroy this collection ?
    </Dialog>
  );
};

DeleteAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteAlert;
