import React, { Component } from 'react';
import TextFieldOriginal from 'material-ui/TextField';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ContentSave from 'material-ui/svg-icons/content/save';
import IconButton from 'material-ui/IconButton';

import * as _style from './style';

class TextField extends Component {
  
  state = {
    editing: false
  };
  
  switchMode = _ => {
    const { onSave } = this.props;
    const { editing } = this.state;
    this.setState({ editing: !editing });
    if (editing) {
      onSave();
    }
  };
  
  render() {
    const { id, value, onChange } = this.props;
    const { editing } = this.state;
    return (
      <div>
        <TextFieldOriginal
          id={id}
          value={value}
          style={_style.textField}
          inputStyle={_style.input}
          disabled={!editing}
          onChange={onChange}
        />
        <IconButton style={_style.icon} >
          <Icon editing={editing} handleClick={this.switchMode} />
        </IconButton>
      </div>
    );
  }
}

const Icon = ({ editing, handleClick }) => {
  if (editing) {
    return <ContentSave onClick={handleClick} />;
  }
  return <EditorModeEdit onClick={handleClick} />;
};

export default TextField;