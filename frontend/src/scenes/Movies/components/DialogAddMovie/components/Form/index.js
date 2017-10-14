import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui'

const formStyle = {
  textAlign: 'center'
};

const buttonStyle = {
  marginLeft: '10px'
};

class Form extends Component {
  
  constructor(props) {
    super();
    this.search = props.handleSubmit;
  }
  
  render() {
    return (
      <form onSubmit={this.search}>
        <div style={formStyle}>
          <Field name="title" hintText="Title" component={TextField} />
          <RaisedButton label="Search" primary={true} style={buttonStyle} onClick={this.search} />
        </div>
      </form>
    );
  }
}

Form = reduxForm({
  form: 'DialogAddMovieForm'
})(Form);

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);