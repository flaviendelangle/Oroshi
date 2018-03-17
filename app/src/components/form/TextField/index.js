import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TextFieldOriginal from 'material-ui/TextField'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ContentSave from 'material-ui/svg-icons/content/save'
import IconButton from 'material-ui/IconButton'

import styles from './TextField.scss'


class TextField extends PureComponent {
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
      <div className={styles.TextField}>
        <TextFieldOriginal
          id={id}
          value={value}
          className={styles.Content}
          disabled={!editing}
          onChange={onChange}
        />
        <IconButton className={styles.Icon} >
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
