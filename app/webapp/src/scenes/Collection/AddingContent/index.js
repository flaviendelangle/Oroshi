import React from 'react'
import PropTypes from 'prop-types'

import Grid from '../../../components/generics/Grid/index'
import Stream from '../../../components/generics/Stream/index'
import Progress from '../../../components/generics/Progress/index'

import { connect } from '../../../services/redux'
import scrollable from '../../../helpers/scrollable'


const AddingContent = ({
  isLoaded,
  addingSearch,
  recommendations,
  collection,
  type,
  elementComponent,
  lineDimensions,
}) => {
  if (!isLoaded) {
    return (
      <Progress />
    )
  }
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

AddingContent.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  collection: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  elementComponent: PropTypes.func.isRequired,
  lineDimensions: PropTypes.object.isRequired,
  recommendations: PropTypes.object.isRequired,
  addingSearch: PropTypes.object,
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
)(scrollable(AddingContent))
