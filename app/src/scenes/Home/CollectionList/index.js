import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { isEmpty } from 'lodash'

import FlatButton from 'material-ui/FlatButton'

import CollectionBox from './CollectionBox/index'
import NewCollectionButton from '../NewCollectionButton/index'

import styles from './CollectionList.scss'


const COVER_SIZE = 0.75

class CollectionList extends PureComponent {
  static propTypes = {
    collections: PropTypes.array.isRequired,
    lineDimensions: PropTypes.object.isRequired,
  }

  state = {
    showAll: false,
  }

  getCollections() {
    const { collections, lineDimensions: { coversPerLine } } = this.props
    const { showAll } = this.state
    if (showAll) {
      return {
        content: collections,
        moreToShow: false,
      }
    } else if (collections.length > coversPerLine - 1) {
      return {
        content: collections.slice(0, coversPerLine - 1),
        moreToShow: true,
      }
    }
    return {
      content: collections,
      moreToShow: false,
    }
  }

  showAll = () => {
    this.setState(() => ({ showAll: true }))
  }

  render() {
    const { showAll } = this.state
    const { collections } = this.props
    const { content, moreToShow } = this.getCollections()

    const listClasses = cx({
      [styles.CollectionList]: true,
      [styles.CollectionListShowAll]: showAll,
    })

    return (
      <div className={listClasses}>
        <div className={styles.Content}>
          {
            content.map((collection) => {
              const { type, pk } = collection
              return (
                <CollectionBox
                  key={`${type}_${pk}`}
                  collection={collection}
                  ratio={COVER_SIZE}
                />
              )
            })
          }
          <NewCollectionButton
            ratio={COVER_SIZE}
            isFirst={isEmpty(collections)}
          />
        </div>
        {
          moreToShow &&
          <FlatButton
            className={styles.ShowAll}
            label="Show All"
            onClick={this.showAll}
          />
        }
      </div>
    )
  }
}

export default CollectionList
