import React, {Component} from 'react';
import { connect } from "react-redux";

import Snackbar from 'material-ui/Snackbar';

import { removeSnack } from 'services/actions/interface';


const DURATION = 2000;

class SnackbarList extends Component {
  
  get oldestMessage() {
    const { messages } = this.props;
    if(messages && messages.length > 0) {
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

const mapStateToProps = (state, ownProps) => {
  const root = state.collections.main[ownProps.scene];
  return {
    messages: root.messages
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    remove: _ => dispatch(removeSnack(ownProps.scene))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarList);