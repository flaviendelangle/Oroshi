import React  from 'react'
import { TextField } from 'redux-form-material-ui'


const formStyle = {
  width: 256,
  margin: '20px auto',
  lineHeight: '4em'
};

const CollectionConfiguration = ({ onTitleChange }) => {
  
  return (
      <div style={formStyle}>
        <TextField hintText="Title" onChange={onTitleChange} />
      </div>
  );
};


export default CollectionConfiguration;

