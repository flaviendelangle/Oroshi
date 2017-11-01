import React, { Component } from 'react'
import { connect } from 'react-redux'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import './style.css'

class CollectionType extends Component {
  
  state = {
    type: 'blank',
    external: 'best_rated',
    duplicate: 0
  };
  
  handleTypeChange = (proxy, type) => {
    this.setState({ type });
    this.handleOnChange();
  };
  
  handleExternalChange = (proxy, external) => {
    this.setState({ external });
    this.handleOnChange()
  };
  
  handleDuplicateChange = (proxy, duplicate) => {
    this.setState({ duplicate });
    this.handleOnChange();
  };
  
  handleOnChange = () => {
    setTimeout(() => {
      this.props.onChange(this.state);
    });
  };
  
  renderDuplicateRadioButtons = () => {
    return this.props.collections.map(collection => {
      return (
        <RadioButton
          value={collection.pk}
          label={collection.title}
          className="radio-button"
          key={collection.pk}
        />
      )
    });
  };
  
  componentDidMount() {
    if(this.props.initialValues.hasOwnProperty('type')) {
      this.setState(this.props.initialValues);
    } else {
      this.handleOnChange();
    }
  }
  
  render() {
    return (
      <div className={'collection-type ' + this.state.type}>
        <div>
          <RadioButtonGroup
            name="collection_type"
            defaultSelected="blank"
            onChange={this.handleTypeChange}
            valueSelected={this.state.type}
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
          <div className="duplicate-content">
            <RadioButtonGroup
              name="external_content"
              defaultSelected="best_rated"
              onChange={this.handleDuplicateChange}
              valueSelected={this.state.duplicate}
            >
              {this.renderDuplicateRadioButtons()}
            </RadioButtonGroup>
          </div>
          <div className="external-content">
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