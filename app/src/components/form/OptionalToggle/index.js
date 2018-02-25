import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'

import styles from './OptionalToggle.scss'


class OptionalToggle extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.shape({
      onChange: PropTypes.func,
    }).isRequired,
  }

  state = {
    toggled: false,
    enabled: false,
  }

  onToggle = (e, toggled) => {
    const { input: { onChange } } = this.props
    this.setState(() => ({ toggled }))
    onChange(toggled)
  }

  onDisable = (e, enabled) => {
    const { input: { onChange } } = this.props
    const { toggled } = this.state
    this.setState(() => ({ enabled }))
    onChange(enabled ? toggled : null)
  }

  render() {
    const { label } = this.props
    const { enabled, toggled } = this.state
    return (
      <div className={styles.OptionalToggle}>
        <div className={styles.Label}>{label}</div>
        <div className={styles.Toggle}>
          <Toggle onToggle={this.onToggle} disabled={!enabled} toggled={toggled} />
        </div>
        <div className={styles.Activated}>
          <Checkbox onCheck={this.onDisable} />
        </div>
      </div>
    )
  }
}

export default OptionalToggle
