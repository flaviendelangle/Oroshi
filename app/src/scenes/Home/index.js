import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'


import CollectionList from './CollectionList'
import FirstCollectionButton from './FirstCollectionButton'
import DialogCreateCollection from './DialogCreateCollection'
import Progress from '../../components/generics/Progress'

import { getAll as getCollections } from '../../services/actions/collections'
import scrollable from '../../helpers/scrollable'


class Home extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    loadCollections: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    collections: PropTypes.array.isRequired,
    oauth: PropTypes.object,
    profile: PropTypes.object,
  }

  constructor(props) {
    super(props)
    const { oauth, history } = this.props
    if (!oauth) {
      history.push('/login/')
    }
  }

  componentDidMount() {
    const { profile } = this.props
    if (profile) {
      this.loadCollections(profile)
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.profile &&
      !this.props.profile
    ) {
      this.loadCollections(newProps.profile)
    }
  }

  loadCollections = (profile) => {
    this.props.loadCollections(profile.pk)
  }

  render() {
    const { isLoaded, collections } = this.props
    if (!isLoaded) {
      return <Progress />
    }

    return (
      <Fragment>
        {
          isEmpty(collections) ?
            <FirstCollectionButton /> :
            <CollectionList data={collections} />
        }
        <DialogCreateCollection />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const root = state.home.main
  const appRoot = state.app
  return {
    collections: root.collections,
    isLoaded: root.isLoaded,
    oauth: appRoot.oauth,
    profile: appRoot.profile,
  }
}

const mapDispatchToProps = dispatch => ({
  loadCollections: pk => dispatch(getCollections(pk)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(scrollable(Home))
