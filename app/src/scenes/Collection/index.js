import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import CollectionContent from './CollectionContent'
import AddingContent from './AddingContent'
import Menu from './Menu'

import { connect } from '../../services/redux'


const CollectionScene = ({
  type,
  isPublic,
  collection,
  ...props
}) => (
  <Fragment>
    <Content
      type={type}
      collection={collection}
      isPublic={isPublic}
      {...props}
    />
    <Menu
      type={type}
      collection={collection}
      isPublic={isPublic}
    />
  </Fragment>
)

CollectionScene.propTypes = {
  collection: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  isPublic: PropTypes.bool,
}

const Content = ({
  config,
  type,
  isAdding,
  isPublic,
  collection,
}) => {
  if (isAdding) {
    return (
      <AddingContent
        type={type}
        collection={collection}
        elementComponent={config.elementComponent}
        isPublic={isPublic}
      />
    )
  }
  return (
    <CollectionContent
      type={type}
      collection={collection}
      elementComponent={config.elementComponent}
      isPublic={isPublic}
    />
  )
}

Content.propTypes = {
  collection: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  isPublic: PropTypes.bool,
  isAdding: PropTypes.bool,
  config: PropTypes.object,
}

const mapStateToProps = ({ main }) => ({
  isAdding: main.isAdding,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionScene)
