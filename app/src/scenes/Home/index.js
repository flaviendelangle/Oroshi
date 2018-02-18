import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'
import PropTypes from 'prop-types'

import CircularProgress from 'material-ui/CircularProgress'

import CollectionList from './components/CollectionList'
import ManageButton from './components/ManageButton'
import FirstCollectionButton from './components/FirstCollectionButton'
import DialogCreateCollection from './components/DialogCreateCollection'
import { getAll as getCollections } from 'services/actions/collections'

import * as _style from './style'

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

  state = {
    editing: false,
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
    const { editing } = this.state
    if (!isLoaded) {
      return (
        <div style={_style.progress} >
          <CircularProgress />
        </div>
      )
    } else if (collections.length === 0) {
      return (
        <div>
          <div style={_style.container} >
            <FirstCollectionButton />
          </div>
          <DialogCreateCollection />
        </div>
      )
    }
    return (
      <div>
        <ScrollArea
          speed={0.8}
          horizontal={false}
          style={_style.scroll}
        >
          <div style={_style.container} >
            <ManageButton
              editing={editing}
              onClick={() => this.setState({ editing: !editing })}
            />
            <CollectionList
              editing={editing}
              data={collections}
            />
          </div>
        </ScrollArea>
        <DialogCreateCollection />
      </div>
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
)(Home)
