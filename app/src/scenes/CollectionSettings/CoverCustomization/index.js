import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CollectionCover from '../../../components/generics/CollectionCover'
import DialogSearchElement from '../../../components/generics/DialogSearchElement'
import Progress from '../../../components/generics/Progress'

import { connect } from '../../../services/redux'
import { get as getCollection, updateCover } from '../../../services/actions/collections/index'

import styles from './CoverCustomization.scss'


class CoverCustomization extends Component {
  static propTypes = {
    collection: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    lineDimensions: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    isContentLoaded: PropTypes.bool,
    synchronize: PropTypes.func.isRequired,
    updateCovers: PropTypes.func.isRequired,
    content: PropTypes.array.isRequired,
  }

  state = {
    updatedIndex: -1,
  }

  componentDidMount() {
    const { synchronize, isContentLoaded } = this.props
    if (!isContentLoaded) {
      synchronize()
    }
  }

  onItemClick = (updatedIndex) => {
    this.setState(() => ({ updatedIndex }))
  }

  onChooseItem = (element) => {
    const { updatedIndex } = this.state
    this.props.updateCovers(element, updatedIndex).then(this.onModalClose)
  }

  onModalClose = () => this.onItemClick(-1)

  render() {
    const { updatedIndex } = this.state
    const {
      collection,
      type,
      config: { elementComponent },
      lineDimensions,
      isContentLoaded,
      content,
    } = this.props

    if (!isContentLoaded) {
      return <Progress />
    }
    return (
      <div className={styles.CoverCustomization}>
        <CollectionCover
          covers={collection.cover_elements}
          ratio={1}
          onItemClick={this.onItemClick}
        />
        <div className={styles.Help}>Click on the cover you want to change</div>
        <DialogSearchElement
          title="Select your new cover"
          collection={collection}
          type={type}
          open={updatedIndex >= 0}
          onClose={this.onModalClose}
          onChooseItem={this.onChooseItem}
          lineDimensions={lineDimensions}
          elementComponent={elementComponent}
          content={content}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ content }, { app }) => ({
  content: content.content,
  isContentLoaded: content.isContentLoaded,

  lineDimensions: app.lineDimensions,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  synchronize: () => dispatch(getCollection(type, collection)),
  updateCovers: (...args) => dispatch(updateCover(type, collection, ...args)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoverCustomization)
