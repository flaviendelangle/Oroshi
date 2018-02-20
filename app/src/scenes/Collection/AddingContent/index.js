import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from '../../../components/generics/Grid/index'
import Stream from '../../../components/generics/Stream/index'
import Progress from '../../../components/generics/Progress/index'

import { connect } from '../../../services/redux'

import * as _style from './style'


class AddingContent extends Component {
  static propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    collection: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    elementComponent: PropTypes.func.isRequired,
    lineDimensions: PropTypes.object.isRequired,
    recommendations: PropTypes.object.isRequired,
    addingSearch: PropTypes.object,
  }

  renderContent = () => {
    const {
      addingSearch,
      recommendations,
      collection,
      type,
      elementComponent,
      lineDimensions,
    } = this.props
    if (addingSearch) {
      return (
        <Grid
          data={addingSearch}
          collection={collection}
          type={type}
          elementComponent={elementComponent}
          lineDimensions={lineDimensions}
          creationMode
        />
      )
    }
    return (
      <Stream
        data={recommendations}
        collection={collection}
        type={type}
        elementComponent={elementComponent}
        lineDimensions={lineDimensions}
        creationMode
      />
    )
  }

  render() {
    const { isLoaded } = this.props
    if (!isLoaded) {
      return (
        <Progress />
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

const mapStateToProps = ({ adding }, state) => ({
  isLoaded: adding.isLoaded,
  collection: adding.collection,
  recommendations: adding.recommendations,
  addingSearch: adding.addingSearch,

  lineDimensions: state.app.lineDimensions,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddingContent)
