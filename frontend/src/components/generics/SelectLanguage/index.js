import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { getPublicAPILanguages } from 'services/languages';

/*
const SelectLanguage = ({ onChange, scene, value, style }) => {
  let languages = getPublicAPILanguages(scene);
  const original = { name: 'Original language', code: '-' };
  languages = [original].concat(languages);
  
  const handleChange = (proxy, index, value) => {
    onChange(value);
  };
  
  return (
    <SelectField
      value={value}
      onChange={handleChange}
      style={style}
    >
      <Items languages={languages} />
    </SelectField>

  );
};

const Items = ({ languages }) => {
  return languages.map(el => {
    return (
      <MenuItem
        value={el.code}
        primaryText={el.name}
        key={el.code}
      />
    );
  });
};
*/


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