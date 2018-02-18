import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { getPublicAPILanguages } from 'services/languages'


class SelectLanguage extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    style: PropTypes.object.isRequired,
  }

  get languages() {
    const { type } = this.props
    const languages = getPublicAPILanguages(type)
    const original = { name: 'Original language', code: '-' }
    return [original].concat(languages)
  }

  handleOnChange = (proxy, index, value) => {
    this.props.onChange(value)
  }

  renderLanguages = () => {
    return this.languages.map((el) => {
      return (
        <MenuItem
          value={el.code}
          primaryText={el.name}
          key={el.code}
        />
      )
    })
  }

  render() {
    const { style, value } = this.props
    return (
      <SelectField
        value={value}
        onChange={this.handleOnChange}
        style={style}
      >
        {this.renderLanguages()}
      </SelectField>
    )
  }
}

export default SelectLanguage
