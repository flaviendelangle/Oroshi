import React from 'react'
import PropTypes from 'prop-types'

import SearchBar from 'material-ui-search-bar'

import styles from './Search.scss'


const Search = ({ input, ...props }) => (
  <div className={styles.Search}>
    <SearchBar {...props} {...input} />
  </div>
)

Search.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
  }).isRequired,
}

export default Search
