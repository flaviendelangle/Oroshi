import React, { Component } from 'react'
import { connect } from 'react-redux'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import './style.css'

class CollectionType extends Component {
  
  state = {
    type: 'blank',
    external: 'best_rated'
  };
  
  handleTypeChange = (proxy, type) => {
    this.setState({ type });
    this.handleOnChange();
  };
  
  handleExternalChange = (proxy, external) => {
    this.setState({ external })
    this.handleOnChange()
  };
  
  handleOnChange = () => {
    this.props.onChange(this.state.type, this.state.external);
  };
  
  componentDidMount() {
    this.handleOnChange();
  }
  
  render() {
    return (
      <div className={'collection-type ' + this.state.type}>
        <div>
          <RadioButtonGroup
            name="collection_type"
            defaultSelected="blank"
            onChange={this.handleTypeChange}
          >
            <RadioButton
              value="blank"
              label="Create a blank collection"
              className="radio-button"
            />
            <RadioButton
              value="duplicate"
              label="Duplicate an existing collection"
              className="radio-button"
            />
            <RadioButton
              value="external"
              label="Import from an external source"
              className="radio-button"
            />
          </RadioButtonGroup>
        </div>
        <div>
          <RadioButtonGroup
            name="external_content"
            defaultSelected="best_rated"
            onChange={this.handleExternalChange}
          >
            <RadioButton
              value="best_rated"
              label="Best rated movies"
              className="radio-button"
            />
            <RadioButton
              value="in_theatre"
              label="Currently in theatre"
              className="radio-button"
            />
            <RadioButton
              value="popular"
              label="Popular"
              className="radio-button"
            />
          </RadioButtonGroup>
        </div>
      </div>
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