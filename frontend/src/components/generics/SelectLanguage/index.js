import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { getPublicAPILanguages } from 'services/languages';


const SelectLanguage = ({ onChange, scene, value, style }) => {
  
  let languages = getPublicAPILanguages(scene);
  const original = { name: 'Original language', code: '-' };
  languages = [original].concat(languages);
  
  const handleOnChange = (proxy, index, value) => {
    onChange(value);
  };

  return (
    <SelectField
      value={value}
      onChange={handleOnChange}
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

export default SelectLanguage;