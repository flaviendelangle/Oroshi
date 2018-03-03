import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SearchBar from 'material-ui-search-bar'
import AutoComplete from 'material-ui/AutoComplete'

import { search, getRecommendations } from '../../../../services/actions/publicAPI'
import { updateQuery } from '../../../../services/actions/content'

import styles from './Search.scss'


class Search extends Component {
  static propTypes = {
    filter: PropTypes.func.isRequired,
    autoComplete: PropTypes.array,
    count: PropTypes.number,
    isAdding: PropTypes.bool,
    title: PropTypes.string,
    query: PropTypes.string,
  }

  state = {
    query: '',
  }

  get hintText() {
    const { isAdding, title } = this.props
    if (isAdding) {
      return 'Search for content to add'
    }
    return title ? `Search in ${title}` : 'Search ...'
  }

  search = (query) => {
    this.setState({ query })
    this.filter(query, false)
  }

  filter = (query, forced) => {
    const { isAdding, filter } = this.props
    filter(query, forced, isAdding)
  }


  render() {
    const {
      query,
      autoComplete,
      isAdding,
      count,
    } = this.props
    return (
      <div className={styles.Search}>
        <SearchBar
          hintText={this.hintText}
          onChange={this.search}
          onRequestSearch={() => this.filter(this.state.query, true)}
          value={query}
          dataSource={autoComplete}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={10}
        />
        {
          !isAdding &&
          <div className={styles.ElementCount} >
            {`${count} element${(count > 1 ? 's' : '')}`}
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  filter: (query, forced, isAdding) => {
    dispatch(updateQuery(type, collection, query))
    if (
      isAdding &&
      forced
    ) {
      if (query === '') {
        dispatch(getRecommendations(type, collection))
      } else {
        dispatch(search(type, collection, query))
      }
    }
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
