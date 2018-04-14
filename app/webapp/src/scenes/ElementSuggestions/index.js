import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Stream from '../../components/generics/Stream'
import Progress from '../../components/generics/Progress'
import { getSuggestions, getSettings } from '../../services/actions/collections'
import { cleanElementSuggestions } from '../../services/actions/interface'
import { connect } from '../../services/redux'
import scrollable from '../../helpers/scrollable'


class ElementSuggestions extends PureComponent {
  static propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    collection: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    synchronize: PropTypes.func.isRequired,
    loadCollection: PropTypes.func.isRequired,
    cleanScene: PropTypes.func.isRequired,
    suggestionsLoaded: PropTypes.bool,
    suggestions: PropTypes.object,
    lineDimensions: PropTypes.object,
  }

  componentDidMount() {
    const {
      loadCollection,
      synchronize,
      match: { params: { element_id: elementId } },
      collection,
      isLoaded,
    } = this.props
    if (isLoaded) {
      synchronize(elementId)
    } else {
      loadCollection(collection).then(() => synchronize(elementId))
    }
  }

  componentWillUnmount() {
    const { cleanScene } = this.props
    cleanScene()
  }

  render() {
    const {
      isLoaded,
      suggestions,
      suggestionsLoaded,
      collection,
      type,
      config,
      lineDimensions,
    } = this.props
    if (
      !isLoaded ||
      !suggestionsLoaded
    ) {
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

const mapStateToProps = ({ suggestions, main }, state) => ({
  isLoaded: main.isLoaded,
  collection: main.collection,

  suggestions: suggestions.suggestions,
  suggestionsLoaded: suggestions.suggestionsLoaded,

  lineDimensions: state.app.lineDimensions,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  loadCollection: () => dispatch(getSettings(type, collection)),
  synchronize: elementId => dispatch(getSuggestions(type, collection, elementId)),
  cleanScene: () => dispatch(cleanElementSuggestions(type, collection)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(scrollable(ElementSuggestions))
