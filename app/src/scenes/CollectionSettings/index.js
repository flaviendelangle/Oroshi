import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MenuPanel from './MenuPanel'
import ContentPanel from './ContentPanel'
import Progress from '../../components/generics/Progress'

import { getSettings } from '../../services/actions/collections'
import { connect } from '../../services/redux'

import styles from './CollectionSettings.scss'


class CollectionSettings extends Component {
  static propTypes = {
    synchronize: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    redirect: PropTypes.bool,
    isLoaded: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { synchronize, isLoaded } = this.props
    if (!isLoaded) {
      synchronize()
    }
  }

  componentWillReceiveProps(newProps) {
    const { redirect, history } = this.props
    if (
      !redirect &&
      newProps.redirect
    ) {
      history.push(newProps.redirect)
    }
  }

  render() {
    const { type, collection, isLoaded } = this.props

    if (!isLoaded) {
      return <Progress />
    }

    return (
      <div className={styles.CollectionSettings}>
        <MenuPanel type={type} collection={collection} />
        <ContentPanel type={type} collection={collection} />
      </div>
    )
  }
}

const mapStateToProps = ({ main, settings }) => ({
  isLoaded: main.isLoaded,
  collection: main.collection,

  redirect: settings.redirect,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  synchronize: () => dispatch(getSettings(type, collection)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionSettings)
