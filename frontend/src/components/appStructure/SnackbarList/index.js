import React, {Component} from 'react';

import Snackbar from 'material-ui/Snackbar';

import { removeSnack } from 'services/actions/interface';
import { connect } from 'services/redux';


const DURATION = 2000;

class SnackbarList extends Component {
  
  get oldestMessage() {
    const { messages } = this.props;
    if (messages && messages.length > 0) {
      return {
        show: true,
        ...messages[0]
      }
    }
    return {
      show: false,
      content: ''
    };
  }
  
  handleRequestClose = _ => {
    this.props.remove();
  };
  
  render() {
    const message = this.oldestMessage;
    return (
      <Snackbar
        open={message.show}
        message={message.content}
        autoHideDuration={DURATION}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
  
}

const mapStateToProps = ({ main }) => {
  return {
    messages: main.messages
  }
};

const mapDispatchToProps = (dispatch, { type, collection }) => {
  return {
    remove: _ => dispatch(removeSnack(type, collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarList);