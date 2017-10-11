import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class DialogAddMovie extends Component {
  
  state = {
    isOpen: false
  };
  
  constructor(props) {
    super();
    this.props = props;
    

  }
  
  handleOpen = () => {
    //this.setState({isOpen: true});
  };
  
  handleClose = () => {
    //this.setState({isOpen: false});
  };
  
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ];
    
    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={true}
          open={this.props.isOpen}
        >
          Only actions can close this dialog.
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.movies.dialogAddMovie.isAddingAMovie
  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddMovie);