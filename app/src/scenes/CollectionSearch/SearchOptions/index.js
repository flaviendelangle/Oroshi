import React from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import { isFunction } from 'lodash'

import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'

import { getSearchOptions } from '../../../services/content/collectionTypes'

import styles from './SearchOptions.scss'


const buildChildren = (children, choices, content) => {
  if (children) {
    return children
  }
  if (isFunction(choices)) {
    return choices(content).map(el => (
      <MenuItem
        value={el}
        primaryText={el}
        key={el}
      />
    ))
  }
  return null
}

const SearchOptions = ({ type, content }) => (
  <Paper
    className={styles.SearchOptions}
    zDepth={2}
  >
    {
      getSearchOptions(type).search.map(({ name, ...props }) => (
        <Option key={name} name={name} {...props} content={content} />
      ))
    }
  </Paper>
)

SearchOptions.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
}

const Option = ({
  choices,
  children,
  name,
  content,
  ...props
}) => {
  const newChildren = buildChildren(children, choices, content)
  return (
    <div className={styles.Option}>
      <Field {...props} name={name}>
        {newChildren}
      </Field>
    </div>
  )
}

Option.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  children: PropTypes.node,
  choices: PropTypes.func,
}

export default SearchOptions
