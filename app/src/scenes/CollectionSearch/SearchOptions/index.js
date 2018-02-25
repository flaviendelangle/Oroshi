import React from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'

import { getSearchOptions } from '../../../services/content/collectionTypes'

import styles from './SearchOptions.scss'


const SearchOptions = ({ type }) => (
  <Paper
    className={styles.SearchOptions}
    zDepth={2}
  >
    <div className={styles.Content}>
      {
        getSearchOptions(type).map(option => console.log(option) || (
          <div key={option.name}>
            <Field {...option} />
          </div>
        ))
      }
    </div>
  </Paper>
)

SearchOptions.propTypes = {
  type: PropTypes.string.isRequired,
}

export default SearchOptions
