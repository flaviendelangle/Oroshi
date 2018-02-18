import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MenuPanel from './components/MenuPanel'
import ContentPanel from './components/ContentPanel'
import { getSettings } from 'services/actions/collections'
import { connect } from 'services/redux'


class CollectionSettings extends Component {
  static propTypes = {
    synchronize: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    redirect: PropTypes.bool,
  }

  componentDidMount() {
    const { synchronize, collection } = this.props
    synchronize(collection.pk)
  }

  componentWillReceiveProps(newProps) {
    const { redirect, history } = this.props
    if (!redirect && newProps.redirect) {
      history.push(newProps.redirect)
    }
  }

  render() {
    const { type, collection } = this.props
    return (
      <div className="collection-settings">
        <MenuPanel type={type} collection={collection} />
        <ContentPanel type={type} collection={collection} />
      </div>
    )
  }
}

const mapStateToProps = ({ settings }) => ({
  redirect: settings.redirect,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  synchronize: () => dispatch(getSettings(type, collection)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionSettings)
