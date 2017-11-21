import React, { Component } from 'react';
import { connect } from 'react-redux';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import './style.css'

class CollectionType extends Component {
  
  state = {
    type: 'movies'
  };
  
  handleOnChange = () => {
    setTimeout(() => {
      this.props.onChange(this.state);
    });
  };
  
  handleTypeChange = (proxy, type) => {
    this.setState({ type });
    this.handleOnChange();
  };
  
  componentDidMount() {
    if (this.props.initialValues.hasOwnProperty('type')) {
      this.setState(this.props.initialValues);
    } else {
      this.handleOnChange();
    }
  }
  
  render() {
    return (
      <RadioButtonGroup
        name="collection_source"
        defaultSelected="blank"
        onChange={this.handleTypeChange}
        valueSelected={this.state.type}
      >
        <RadioButton
          value="movies"
          label="Create a movie collection"
          className="radio-button"
        />
        <RadioButton
          value="tv_shows"
          label="Create a TV-show collection"
          className="radio-button"
        />
      </RadioButtonGroup>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionType);