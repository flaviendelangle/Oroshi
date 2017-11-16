import React, { Component } from 'react';
import TextFieldOriginal from 'material-ui/TextField';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ContentSave from 'material-ui/svg-icons/content/save';
import IconButton from 'material-ui/IconButton';



const textFieldStyle = {
  position: 'absolute',
  top: -5,
  right: 50,
};

const inputStyle = {
  textAlign: 'right'
};

const iconStyle = {
  position: 'absolute',
  top: -5,
  right: 0
};

class TextField extends Component {
  
  state = {
    editing: false
  };
  
  switchMode = () => {
    this.setState({ editing: !this.state.editing });
  };
  
  renderIcon = () => {
    if(this.state.editing) {
      return <ContentSave onClick={this.switchMode}/>;
    }
    return <EditorModeEdit onClick={this.switchMode}/>;
  };
  
  render() {
    return (
      <div>
        <TextFieldOriginal
          id={this.props.id}
          value={this.props.value}
          style={textFieldStyle}
          inputStyle={inputStyle}
          disabled={!this.state.editing}
        />
        <IconButton style={iconStyle}>
          {this.renderIcon()}
        </IconButton>
      </div>
    );
  }
}

export default TextField;