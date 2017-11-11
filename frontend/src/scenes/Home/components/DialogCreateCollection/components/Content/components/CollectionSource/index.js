import React, { Component } from 'react'
import { connect } from 'react-redux'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import './style.css'

class CollectionSource extends Component {
  
  state = {
    source: 'blank',
    external: 'csv_file',
    duplicate: 0
  };
  
  handleSourceChange = (proxy, source) => {
    this.setState({ source });
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
          key={collection.type + '_' + collection.pk}
        />
      )
    });
  };
  
  componentDidMount() {
    if(this.props.initialValues.hasOwnProperty('source')) {
      this.setState(this.props.initialValues);
    } else {
      this.handleOnChange();
    }
  }
  
  render() {
    return (
      <div className={'collection-source ' + this.state.source}>
        <div>
          <RadioButtonGroup
            name="collection_source"
            defaultSelected="blank"
            onChange={this.handleSourceChange}
            valueSelected={this.state.source}
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
              onChange={this.handleDuplicateChange}
              valueSelected={this.state.duplicate}
            >
              {this.renderDuplicateRadioButtons()}
            </RadioButtonGroup>
          </div>
          <div className="external-content">
            <RadioButtonGroup
              name="external_content"
              onChange={this.handleExternalChange}
              valueSelected={this.state.external}
            >
              <RadioButton
                value="csv_file"
                label="Local CSV file"
                className="radio-button"
              />
              <RadioButton
                value="best_rated"
                label="Best rated movies"
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
)(CollectionSource);