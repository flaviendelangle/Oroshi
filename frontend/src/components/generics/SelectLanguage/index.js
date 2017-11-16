import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { getPublicAPILanguages } from 'services/languages';


class SelectLanguage extends Component {
  
  get languages() {
    const languages = getPublicAPILanguages(this.props.scene);
    const original = { name: 'Original language', code: '-' };
    return [original].concat(languages);
  }
  
  handleOnChange = (proxy, index, value) => {
    this.props.onChange(value);
  };
  
  renderLanguages = () => {
    return this.languages.map(el => {
      return (
        <MenuItem
          value={el.code}
          primaryText={el.name}
          key={el.code}
        />
      );
    })
  };
  
  render() {
    return (
      <SelectField
        value={this.props.value}
        onChange={this.handleOnChange}
        style={this.props.style}
      >
        {this.renderLanguages()}
      </SelectField>

    );
  }
}


export default SelectLanguage;