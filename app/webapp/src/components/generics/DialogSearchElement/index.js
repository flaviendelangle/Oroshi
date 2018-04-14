import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'

import Dialog from 'material-ui/Dialog'
import SearchBar from 'material-ui-search-bar'

import { ScrollableGrid } from '../Grid'

import styles from './DialogSearchElement.scss'


class DialogSearchElement extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onChooseItem: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    lineDimensions: PropTypes.object.isRequired,
    elementComponent: PropTypes.func.isRequired,
    content: PropTypes.array.isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { content } = nextProps
    if (!isEqual(prevState.matches, content)) {
      return {
        matches: content,
        query: '',
      }
    }
    return null
  }

  state = {
    query: '',
    matches: [],
  }

  search = (query) => {
    this.setState(() => ({ query }))
    this.filter(query)
  }

  filter = (query) => {
    const { content } = this.props
    const matches = content.filter(el => el.matchQuery(query))
    this.setState(() => ({ matches }))
  }

  render() {
    const {
      open,
      title,
      onClose,
      onChooseItem,
      collection,
      lineDimensions,
      elementComponent,
      type,
    } = this.props

    const { query, matches } = this.state

    return (
      <Dialog
        title={title}
        modal={false}
        open={open}
        onRequestClose={onClose}
        className={styles.DialogSearchElement}
        bodyClassName={styles.Body}
        autoScrollBodyContent
      >
        <div className={styles.SearchBar}>
          <SearchBar
            hintText={this.hintText}
            onChange={this.search}
            onRequestSearch={() => this.filter(query)}
            value={query}
            className={styles.Input}

          />
        </div>
        <ScrollableGrid
          type={type}
          collection={collection}
          data={{ results: matches }}
          lineDimensions={lineDimensions}
          elementComponent={elementComponent}
          maxElementPerLine={2}
          className={styles.Grid}
          elementProps={{
            overlay: 'clickable',
            onClick: onChooseItem,
          }}
        />
      </Dialog>
    )
  }
}

export default DialogSearchElement
