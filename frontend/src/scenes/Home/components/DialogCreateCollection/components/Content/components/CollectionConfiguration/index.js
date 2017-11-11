import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form'
import { TextField, Toggle } from 'redux-form-material-ui'
import Dropzone from 'react-dropzone'

import './style.css'

const formName = 'DialogCreateCollectionConfigurationForm';

const formStyle = {
  display: 'inline-block',
  width: '40%',
  margin: '20px 5%',
  lineHeight: '4em',
  verticalAlign: 'top'
};

const dropZoneStyle = {
  padding: '0 10px',
  width: 'calc(100% - 20px)',
  height: 'auto',
  borderColor: 'rgb(102, 102, 102)',
  borderStyle: 'dashed',
  borderRadius: 5,
  cursor: 'pointer'
};

class CollectionConfiguration extends Component {

  state = {
    isCSV: false
  };
  
  updateCSV = upload => {
    this.setState({isCSV: true});
    this.props.updateCSV(upload[0]);
  };
  
  renderFileInput = () => {

    const params = this.props.collectionSource;
    if(params.source === 'external' && params.external === 'csv_file') {
      return (
        <div>
          <Field name="csv" component='input' type="hidden" ref="file_input"/>
          <Dropzone
            onDrop={this.updateCSV}
            multiple={false}
            accept='.csv'
            style={dropZoneStyle}
          >
            {() => {
              if (this.state.isCSV) {
                return "File dropped successfully";
              }
              return "Click to pick your CSV file";
            }}
          </Dropzone>
        </div>
      );
    } else {
      return null;
    }
  };
  
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
          {this.renderFileInput()}
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
    updateCSV: value => dispatch(change(formName, 'csv', value))
  }
};

CollectionConfiguration = reduxForm({
  form: formName
})(CollectionConfiguration);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionConfiguration);