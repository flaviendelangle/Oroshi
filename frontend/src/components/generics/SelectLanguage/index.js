import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { getPublicAPILanguages } from 'services/languages';


const SelectLanguage = ({ onChange }) => {
  
  let languages = getPublicAPILanguages(this.props.scene);
  const original = { name: 'Original language', code: '-' };
  languages = [original].concat(languages);
  
  const handleOnChange = (proxy, index, value) => {
    onChange(value);
  };

  return (
    <SelectField
      value={this.props.value}
      onChange={handleOnChange}
      style={this.props.style}
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

export default SelectLanguage;