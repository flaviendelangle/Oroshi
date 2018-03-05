import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CollectionList from './CollectionList'
import DialogCreateCollection from './DialogCreateCollection'
import Menu from './Menu'
import Progress from '../../components/generics/Progress'

import { getAll as getCollections } from '../../services/actions/collections'
import scrollable from '../../helpers/scrollable'


class Home extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    loadCollections: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    collections: PropTypes.array.isRequired,
    lineDimensions: PropTypes.object.isRequired,
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
    const { isLoaded, collections, lineDimensions } = this.props
    if (!isLoaded) {
      return <Progress />
    }

    return (
      <Fragment>
        <CollectionList
          collections={collections}
          lineDimensions={lineDimensions}
        />
        <Menu />
        <DialogCreateCollection />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ home, app }) => ({
  collections: home.collections,
  isLoaded: home.isLoaded,

  oauth: app.oauth,
  profile: app.profile,
  lineDimensions: app.lineDimensions,
})

const mapDispatchToProps = dispatch => ({
  loadCollections: pk => dispatch(getCollections(pk)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(scrollable(Home))
