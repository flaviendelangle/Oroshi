import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { urls } from 'appConfig';

const ShowPublicLinkAlert = ({ open, data, scene, onClose, onPublish }) => {
  let content;
  let actions = null;
  
  if(data.public) {
    const url = urls.frontend + 'collections/' + scene + '/' + data.pk + '/public/';
    content = (
      <div style={{userSelect: 'text'}}>
        {url}
      </div>
    );
  } else {
    content = 'Are you sure you want to make this collection public ?';
    actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={onClose}
      />,
      <FlatButton
        label="Publish"
        primary={true}
        onClick={onPublish}
      />
    ];
  }
  
  return (
    <Dialog
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={onClose}
    >
      {content}
    </Dialog>
  );
};

export default ShowPublicLinkAlert;