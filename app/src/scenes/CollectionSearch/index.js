import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Progress from 'components/generics/Progress'
import { get as getCollection } from 'services/actions/collections'
import { connect } from "services/redux"
import Options from './components/Options'

import * as _style from './style'


class CollectionSearch extends Component {
  static propTypes = {
    collection: PropTypes.object.isRequired,
    found: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isContentLoaded: PropTypes.bool,
  }
  componentDidMount() {
    const { synchronize, isLoaded, isContentLoaded } = this.props
    if (!isLoaded || !isContentLoaded) {
      synchronize()
    }
  }

  render() {
    const {
      isLoaded,
      isContentLoaded,
    } = this.props
    if (!isLoaded || !isContentLoaded) {
      return (
        <Progress />
      )
    }
    return (
      <div style={_style.page} >
        <div style={_style.container} >
          <Options {...this.props} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ content, main }, state) => ({
  collection: main.collection,
  found: main.found,
  isLoaded: main.isLoaded,

  isContentLoaded: content.isContentLoaded,

  lineDimensions: state.app.lineDimensions,
})


const mapDispatchToProps = (dispatch, { type, collection }) => ({
  synchronize: () => dispatch(getCollection(type, collection)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionSearch)

