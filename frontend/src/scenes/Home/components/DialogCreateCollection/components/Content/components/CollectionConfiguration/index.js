import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { TextField, Toggle } from 'redux-form-material-ui'

import './style.css'

const formStyle = {
  display: 'inline-block',
  width: '40%',
  margin: '20px 5%',
  lineHeight: '4em',
  verticalAlign: 'top'
};

class CollectionConfiguration extends Component {

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div style={formStyle}>
          <div>
            <Field
              name="title"
              hintText="Title"
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="password"
              hintText="Password (optional)"
              component={TextField}
              type="password"
            />
          </div>
        </div>
        <div style={formStyle}>
          <Field
            style={{height: '4em', paddingTop: '1em'}}
            name="adult_content"
            label="Include adult content"
            component={Toggle}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

CollectionConfiguration = reduxForm({
  form: 'DialogCreateCollectionConfigurationForm'
})(CollectionConfiguration);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionConfiguration);