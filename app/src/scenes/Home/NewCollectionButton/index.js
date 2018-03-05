import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CollectionCover from '../../../components/generics/CollectionCover/index'
import { showDialogCreateCollection } from '../../../services/actions/interface'

import styles from './NewCollectionButton.scss'


const NewCollectionButton = ({ createCollection, ratio, isFirst }) => (
  <div data-ratio={ratio} className={styles.NewCollectionButton}>
    <CollectionCover creationMode onClick={createCollection} ratio={ratio} />
    <div className={styles.Title} >
      { isFirst ? 'Create your first collection' : 'Create a new collection' }
    </div>
  </div>
)

NewCollectionButton.propTypes = {
  createCollection: PropTypes.func.isRequired,
  ratio: PropTypes.number.isRequired,
  isFirst: PropTypes.bool.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  createCollection: () => dispatch(showDialogCreateCollection(true)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCollectionButton)
