import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CollectionContent from './components/CollectionContent'
import AddingContent from './components/AddingContent'
import Menu from './components/Menu'

import { connect } from 'services/redux'


class CollectionScene extends Component {
  static propTypes = {
    collection: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    isPublic: PropTypes.bool,
  }

  render() {
    const { type, isPublic, collection } = this.props
    return (
      <div>
        <Content {...this.props} />
        <Menu
          type={type}
          collection={collection}
          isPublic={isPublic}
        />
      </div>
    )
  }
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
