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
  
  switchMode = () => {
    const editing = !this.state.editing;
    this.setState({ editing });
    if(!editing) {
      this.props.onSave();
    }
  };
  
  render() {
    return (
      <div>
        <TextFieldOriginal
          id={this.props.id}
          value={this.props.value}
          style={_style.textField}
          inputStyle={_style.input}
          disabled={!this.state.editing}
          onChange={this.props.onChange}
        />
        <IconButton style={_style.icon}>
          <Icon editing={this.state.editing} handleClick={this.switchMode} />
        </IconButton>
      </div>
    );
  }
}

const Icon = ({ editing, handleClick }) => {
  if(editing) {
    return <ContentSave onClick={handleClick}/>;
  }
  return <EditorModeEdit onClick={handleClick}/>;
};

export default TextField;