import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { getPublicAPILanguages } from '../../../services/languages'

import styles from './SelectLanguage.scss'


class SelectLanguage extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
  }

  getLanguages() {
    const { type } = this.props
    const languages = getPublicAPILanguages(type)
    const original = { name: 'Original language', code: '-' }
    return [original].concat(languages)
  }

  handleOnChange = (proxy, index, value) => {
    this.props.onChange(value)
  }

  renderLanguages = () => this.getLanguages().map(el => (
    <MenuItem
      value={el.code}
      primaryText={el.name}
      key={el.code}
    />
  ))

  render() {
    const { style, value, className } = this.props
    const selectClasses = cx({
      [styles.SelectLanguage]: true,
      [className]: !!className,
    })
    return (
      <SelectField
        value={value}
        onChange={this.handleOnChange}
        style={style}
        className={selectClasses}
      >
        {this.renderLanguages()}
      </SelectField>
    )
  }
}

export default SelectLanguage
