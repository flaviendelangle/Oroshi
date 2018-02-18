import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NotFound from 'components/errors/NotFound'
import Grid from 'components/generics/Grid'
import Stream from 'components/generics/Stream'
import Progress from 'components/generics/Progress'
import Help from 'components/generics/Help'
import { connect } from "services/redux"
import { get as getCollection } from 'services/actions/collections'


import * as _style from './style'


class CollectionContent extends Component {
  static propTypes = {
    collection: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    elementComponent: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isContentLoaded: PropTypes.bool,
    synchronize: PropTypes.func.isRequired,
    found: PropTypes.bool,
    content: PropTypes.array,
    isPublic: PropTypes.bool,
    lineDimensions: PropTypes.object,
    layout: PropTypes.string,
    grid: PropTypes.object,
    stream: PropTypes.object,
    order: PropTypes.object,
  }

  componentDidMount() {
    const { synchronize, isLoaded, isContentLoaded } = this.props
    if (!isLoaded || !isContentLoaded) {
      synchronize()
    }
  }

  renderContent = () => {
    const {
      layout,
      grid,
      stream,
      collection,
      order,
      type,
      elementComponent,
      lineDimensions,
      isPublic,
    } = this.props
    if (layout === 'grid') {
      return (
        <Grid
          data={grid}
          collection={collection}
          order={order.grid}
          type={type}
          elementComponent={elementComponent}
          lineDimensions={lineDimensions}
          isPublic={isPublic}
        />
      )
    } else if (layout === 'stream') {
      return (
        <Stream
          data={stream}
          collection={collection}
          type={type}
          elementComponent={elementComponent}
          lineDimensions={lineDimensions}
          isPublic={isPublic}
        />
      )
    }
    return null
  }

  render() {
    const {
      isLoaded,
      found,
      content,
      collection,
      isPublic,
      type,
      elementComponent,
    } = this.props
    if (!isLoaded) {
      return (
        <Progress />
      )
    } else if (!found) {
      return (<NotFound />)
    } else if (content.length === 0) {
      return (
        <Help
          type={type}
          collection={collection}
          elementComponent={elementComponent}
          isPublic={isPublic}
        />
      )
    }
    return (
      <div style={_style.page} >
        <div style={_style.container} >
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ content, main }, state) => ({
  collection: main.collection,
  found: main.found,
  isLoaded: main.isLoaded,

  update: content.update,
  content: content.content,
  isContentLoaded: content.isContentLoaded,
  grid: content.grid,
  stream: content.stream,
  layout: content.layout,
  order: content.order,

  lineDimensions: state.app.lineDimensions,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  synchronize: () => dispatch(getCollection(type, collection)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionContent)
