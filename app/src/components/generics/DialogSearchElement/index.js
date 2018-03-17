import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'

import Dialog from 'material-ui/Dialog'
import SearchBar from 'material-ui-search-bar'

import Grid from '../Grid'
import scrollable from '../../../helpers/scrollable'

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

  state = {
    query: '',
    matches: [],
  }

  componentWillMount() {
    const { content } = this.props
    this.setState(() => ({ matches: content }))
  }

  componentWillReceiveProps(nextProps) {
    const { content } = this.props
    if (!isEqual(nextProps.content, content)) {
      this.setState(() => ({
        matches: nextProps.content,
        query: '',
      }))
    }
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

    const ScrollableGrid = scrollable(Grid)

    return (
      <Dialog
        title={title}
        // actions={actions}
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
