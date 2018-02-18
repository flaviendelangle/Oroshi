import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Stream from 'components/generics/Stream'
import Progress from 'components/generics/Progress'
import { getSuggestions, getSettings } from "services/actions/collections"
import { cleanElementSuggestions } from 'services/actions/interface'
import { connect } from 'services/redux'


class ElementSuggestions extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    collection: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    synchronize: PropTypes.func.isRequired,
    loadCollection: PropTypes.func.isRequired,
    cleanScene: PropTypes.func.isRequired,
    suggestions: PropTypes.object,
    lineDimensions: PropTypes.object,
  }

  componentDidMount() {
    const {
      loadCollection,
      synchronize,
      match: { params: { collection_id, element_id }},
    } = this.props
    loadCollection({ pk: collection_id }).then(() => synchronize(element_id))
  }

  componentWillUnmount() {
    const { cleanScene } = this.props
    cleanScene()
  }

  render() {
    const {
      loaded,
      suggestions,
      collection,
      type,
      config,
      lineDimensions,
    } = this.props
    if (!loaded) {
      return <Progress />
    }
    return (
      <Stream
        data={suggestions}
        collection={collection}
        type={type}
        elementComponent={config.elementComponent}
        lineDimensions={lineDimensions}
        key={2}
        creationMode
      />
    )
  }
}

const mapStateToProps = ({ suggestions }, state) => {
  return {
    loaded: suggestions.loaded,
    collection: suggestions.collection,
    suggestions: suggestions.suggestions,

    lineDimensions: state.app.lineDimensions,
  }
}

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  loadCollection: () => dispatch(getSettings(type, collection)),
  synchronize: elementId => dispatch(getSuggestions(type, collection, elementId)),
  cleanScene: () => dispatch(cleanElementSuggestions(type, collection)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ElementSuggestions)
