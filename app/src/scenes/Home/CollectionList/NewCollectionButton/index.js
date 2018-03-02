import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CollectionCover from '../../../../components/generics/CollectionCover'
import { showDialogCreateCollection } from '../../DialogCreateCollection/actions'


const NewCollectionButton = ({ createCollection }) => (
  <CollectionCover creationMode onClick={createCollection} />
)

NewCollectionButton.propTypes = {
  createCollection: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  createCollection: () => dispatch(showDialogCreateCollection(true)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCollectionButton)
