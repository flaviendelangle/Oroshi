import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CollectionCover from '../../../../components/generics/CollectionCover'
import DialogSearchElement from '../../../../components/generics/DialogSearchElement'
import Progress from '../../../../components/generics/Progress'

import { connect } from '../../../../services/redux'
import { get as getCollection, updateCover } from '../../../../services/actions/collections/index'

import styles from './CoverCustomization.scss'


class CoverCustomization extends Component {
  static propTypes = {
    collection: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    lineDimensions: PropTypes.object.isRequired,
    elementComponent: PropTypes.func.isRequired,
    isContentLoaded: PropTypes.bool,
    synchronize: PropTypes.func.isRequired,
    updateCover: PropTypes.func.isRequired,
    content: PropTypes.array.isRequired,
  }

  state = {
    covers: [],
    updatedIndex: -1,
  }

  componentWillMount() {
    const { collection: { cover_elements: covers } } = this.props
    const completeCover = [
      ...covers,
      ...Array.from({ length: 3 - covers.length }, () => null),
    ]
    this.setState(() => ({ covers: completeCover }))
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
    const { updatedIndex, covers } = this.state
    const newCovers = [
      ...covers.slice(0, updatedIndex),
      element,
      ...covers.slice(updatedIndex + 1),
    ]
    this.props.updateCovers(newCovers)
  }

  onModalClose = () => this.onItemClick(-1)

  render() {
    const { covers, updatedIndex } = this.state
    const {
      collection,
      type,
      lineDimensions,
      elementComponent,
      isContentLoaded,
      content,
    } = this.props

    if (!isContentLoaded) {
      return <Progress />
    }
    return (
      <div className={styles.CoverCustomization}>
        <CollectionCover covers={covers} ratio={1} onItemClick={this.onItemClick} />
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
  updateCover: (elements) => (
    dispatch(updateCover(type, collection, elements))
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoverCustomization)
