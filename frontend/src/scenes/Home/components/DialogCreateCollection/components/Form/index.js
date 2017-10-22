import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import IconButton from 'material-ui/IconButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { TextField } from 'redux-form-material-ui'

import IdenticonField from './components/IdenticonField'
import { updateIdenticon } from './actions'

const formStyle = {
  display: 'inline-block',
  width: '50%',
  marginLeft: '15%',
  lineHeight: '4em',
  verticalAlign: 'top'
};

const identiconStyle = {
  display: 'inline-block'
};

class Form extends Component {
  
  state = {
    iconByTitle: true,
    title: ''
  };
  
  updateTitle = (title) => {
    this.setState({title});
    if(this.state.iconByTitle) {
      this.props.updateIdenticon(title);
    }
  };
  
  reloadIdenticon = () => {
    this.setState({ iconByTitle: false });
    this.props.updateIdenticon(Math.random().toString(36).substr(2, 5));
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
              onChange={(event, title) => this.updateTitle(title)}
            />
          </div>
          <div>
            <Field name="password" hintText="Password (optional)" component={TextField} type="password" />
          </div>
        </div>
        <div style={identiconStyle}>
          <div style={{display: 'inline-block', verticalAlign: 'middle'}}>
            <Field
              name="hash"
              size="120"
              component={IdenticonField}
            />
          </div>
          <div style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: 20}}>
            <IconButton tooltip="New Icon" onClick={this.reloadIdenticon}>
              <NavigationRefresh />
            </IconButton>
          </div>
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
    updateIdenticon: string => dispatch(updateIdenticon(string))
  }
};

Form = reduxForm({
  form: 'DialogCreateCollectionForm'
})(Form);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);


