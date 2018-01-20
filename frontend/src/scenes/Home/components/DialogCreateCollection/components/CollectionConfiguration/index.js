import React from 'react'
import { TextField } from 'redux-form-material-ui'
import PropTypes from 'prop-types';


const formStyle = {
  width: 256,
  margin: '20px auto',
  lineHeight: '4em',
};

const CollectionConfiguration = ({ onTitleChange }) => (
  <div style={formStyle} >
    <TextField hintText="Title" onChange={onTitleChange} onSave={() => {}} />
  </div>
);

CollectionConfiguration.propTypes = {
  onTitleChange: PropTypes.func.isRequired,
};

export default CollectionConfiguration;

