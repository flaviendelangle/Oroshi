import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'

import Grid from '../Grid'
import scrollable from '../../../helpers/scrollable'

// import styles from './DialogSearchElement.scss'


// eslint-disable-next-line
class DialogSearchElement extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    lineDimensions: PropTypes.object.isRequired,
    elementComponent: PropTypes.func.isRequired,
    content: PropTypes.array.isRequired,
  }

  render() {
    const {
      open,
      title,
      onClose,
      collection,
      lineDimensions,
      elementComponent,
      type,
      content,
    } = this.props

    const ScrollableGrid = scrollable(Grid)

    return (
      <Dialog
        title={title}
        // actions={actions}
        modal={false}
        open={open}
        onRequestClose={onClose}
        autoScrollBodyContent
      >
        <ScrollableGrid
          type={type}
          collection={collection}
          data={{ results: content }}
          lineDimensions={lineDimensions}
          elementComponent={elementComponent}
          maxElementPerLine={2}
        />
      </Dialog>
    )
  }
}

export default DialogSearchElement
