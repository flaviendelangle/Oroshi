import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CollectionCover from '../../../../components/generics/CollectionCover'
import { showDialogCreateCollection } from '../../../../services/actions/interface'

import styles from './NewCollectionButton.scss'


const NewCollectionButton = ({ createCollection, ratio }) => (
  <div data-ratio={ratio} className={styles.NewCollectionButton}>
    <CollectionCover creationMode onClick={createCollection} ratio={ratio} />
  </div>
)

NewCollectionButton.propTypes = {
  createCollection: PropTypes.func.isRequired,
  ratio: PropTypes.number.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  createCollection: () => dispatch(showDialogCreateCollection(true)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCollectionButton)
