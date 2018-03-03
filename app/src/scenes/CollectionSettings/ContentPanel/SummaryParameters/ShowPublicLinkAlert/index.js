import React from 'react'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { urls } from '../../../../../appConfig'


const ShowPublicLinkAlert = ({
  open,
  collection,
  type,
  onClose,
  onPublish,
}) => {
  let content
  let actions = null

  if (collection.public) {
    const url = `${urls.frontend}collections/${type}/${collection.pk}/public/`
    content = (
      <div style={{ userSelect: 'text' }} >
        {url}
      </div>
    )
  } else {
    content = 'Are you sure you want to make this collection public ?'
    actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={onClose}
      />,
      <FlatButton
        label="Publish"
        primary
        onClick={onPublish}
      />,
    ]
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
  )
}

ShowPublicLinkAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  collection: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onPublish: PropTypes.func,
}

export default ShowPublicLinkAlert
