import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { TextField } from 'redux-form-material-ui'

import { showDialogAddMovie } from './actions'

class DialogAddMovie extends Component {
  
  constructor(props) {
    super();
    this.close = props.close;
    this.save = props.handleSubmit;
  }
  
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.close}
      />,
      <FlatButton
        label="Save"
        type="submit"
        primary={true}
        onClick={this.save}
      />,
    ];
    
    return (
        <Dialog
          title="New movie"
          actions={actions}
          modal={true}
          open={this.props.isOpen}
        >
          <form>
            <div>
              <Field name="title" hintText="Title" component={TextField} />
            </div>
            <div>
              <Field name="director" hintText="Director" component={TextField} />
            </div>
            <div>
              <Field name="year" hintText="Year of release" component={TextField} />
            </div>
            <button type="submit" style={{ display: 'none' }} />
          </form>
        </Dialog>
    );
  }
}

DialogAddMovie = reduxForm({
  form: 'DialogAddMovie'
})(DialogAddMovie);

const mapStateToProps = state => {
  return {
    isOpen: state.movies.dialogAddMovie.isAddingAMovie
  }
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(showDialogAddMovie(false));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddMovie);