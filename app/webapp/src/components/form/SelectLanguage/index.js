import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { getPublicAPILanguages } from '../../../services/languages'

import styles from './SelectLanguage.scss'


class SelectLanguage extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    hintText: PropTypes.string,
    multiple: PropTypes.bool,
    hasOriginalLanguageLine: PropTypes.bool,
    hasNullLine: PropTypes.bool,
  }

  static addNullLine(lines) {
    return [
      { name: '', code: null },
      ...lines,
    ]
  }

  static addOriginalLanguageLine(lines) {
    return [
      ...lines,
      { name: 'Original language', code: '-' },
    ]
  }

  getLanguages() {
    const { type, hasOriginalLanguageLine, hasNullLine } = this.props
    let languages = getPublicAPILanguages(type)
    if (hasNullLine) {
      languages = SelectLanguage.addNullLine(languages)
    }
    if (hasOriginalLanguageLine) {
      languages = SelectLanguage.addOriginalLanguageLine(languages)
    }
    return languages
  }

  handleOnChange = (proxy, index, value) => {
    this.props.onChange(value)
  }

  render() {
    const {
      style,
      value,
      className,
      multiple,
      hintText,
    } = this.props
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
        multiple={multiple}
        hintText={hintText}
      >
        {
          this.getLanguages().map(el => (
            <MenuItem
              value={el.code}
              primaryText={el.name}
              key={el.code}
            />
          ))
        }
      </SelectField>
    )
  }
}

export const SelectLanguageField = ({ input, ...props }) => (
  <SelectLanguage {...input} {...props} />
)

SelectLanguageField.propTypes = {
  input: PropTypes.object.isRequired,
}

export const SelectLanguageListItem = ({ className, ...props }) => {
  const selectClasses = cx({
    [styles.SelectLanguageListItem]: true,
    [className]: !!className,
  })
  return <SelectLanguage {...props} className={selectClasses} />
}

SelectLanguageListItem.propTypes = {
  className: PropTypes.string,
}

export default SelectLanguage
