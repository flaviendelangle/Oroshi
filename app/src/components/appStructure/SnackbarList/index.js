import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Snackbar from 'material-ui/Snackbar'

import { removeSnack } from '../../../services/actions/interface'
import { connect } from '../../../services/redux'


const DURATION = 2000

class SnackbarList extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
  }

  get oldestMessage() {
    const { messages } = this.props
    if (
      messages &&
      messages.length > 0
    ) {
      return {
        show: true,
        ...messages[0],
      }
    }
    return {
      show: false,
      content: '',
    }
  }

  handleRequestClose = () => {
    this.props.remove()
  }

  render() {
    const message = this.oldestMessage
    return (
      <Snackbar
        open={message.show}
        message={message.content}
        autoHideDuration={DURATION}
        onRequestClose={this.handleRequestClose}
      />
    )
  }
}

const mapStateToProps = ({ main }) => ({
  messages: main.messages,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  remove: () => dispatch(removeSnack(type, collection)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SnackbarList)
