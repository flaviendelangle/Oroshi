import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextFieldOriginal from 'material-ui/TextField'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ContentSave from 'material-ui/svg-icons/content/save'
import IconButton from 'material-ui/IconButton'

import * as _style from './style'

class TextField extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    value: PropTypes.any.isRequired,
  }

  state = {
    editing: false,
  }

  switchMode = () => {
    const { onSave } = this.props
    const { editing } = this.state
    this.setState({ editing: !editing })
    if (editing) {
      onSave()
    }
  }

  render() {
    const { id, value, onChange } = this.props
    const { editing } = this.state
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
          <Icon editing={editing} onClick={this.switchMode} />
        </IconButton>
      </div>
    )
  }
}

const Icon = ({ editing, onClick }) => {
  if (editing) {
    return <ContentSave onClick={onClick} />
  }
  return <EditorModeEdit onClick={onClick} />
}

Icon.propTypes = {
  editing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TextField
