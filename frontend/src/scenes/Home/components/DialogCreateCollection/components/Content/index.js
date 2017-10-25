import React, { Component } from 'react'
import { connect } from 'react-redux'

import CollectionType from './components/CollectionType'
import CollectionConfiguration from './components/CollectionConfiguration'
import CollectionCustomization from './components/CollectionCustomization'

class Content extends Component {
  
  state = {
    collectionType: {},
    collectionConfiguration: {},
    collectionCustomization: {}
  };
  
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  
  setCollectionType = (type, external) => {
    this.setState({ collectionType: {type, external} });
  };
  
  setCollectionCustomization = identiconString => {
    this.setState({ collectionCustomization: { identiconString }});
  };
  
  validateConfiguration = (collectionConfiguration) => {
    if(collectionConfiguration.title) {
      this.props.onStepIndexUpdate(this.props.stepIndex + 1);
      this.setState({ collectionConfiguration })
    }
  };
  
  submit = () => {
    return {
      title: this.state.collectionConfiguration.title,
      password: this.state.collectionConfiguration.password,
      hash: this.state.collectionCustomization.identiconString
    }
  };
  
  render() {
    if(this.props.stepIndex === 0) {
      return (
        <CollectionType
          onChange={this.setCollectionType}
        />
      );
    }
    else if(this.props.stepIndex === 1) {
      return (
        <CollectionConfiguration
          collectionType={this.state.collectionType}
          initialValues={this.state.collectionConfiguration}
          onSubmit={this.validateConfiguration}
        />
      )
    } else if(this.props.stepIndex === 2) {
      return (
        <CollectionCustomization
          onChange={this.setCollectionCustomization}
        />
      );
    } else {
      return (null);
    }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);