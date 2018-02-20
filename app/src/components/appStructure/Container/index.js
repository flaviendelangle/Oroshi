import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import muiThemeable from 'material-ui/styles/muiThemeable'

import Home from '../../../scenes/Home'
import Login from '../../../scenes/Login'
import Logout from '../../../scenes/Logout'
import Collection from '../Collection'

import { notifyRouteChange } from '../../../services/actions/router'
import { getProfile } from '../../../services/actions/users'


class Container extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
    loadProfile: PropTypes.func.isRequired,
    onRouteChange: PropTypes.func.isRequired,
    username: PropTypes.string,
    profile: PropTypes.object,
    oauth: PropTypes.object,
  }

  componentDidMount() {
    this.getProfile()
  }

  componentWillReceiveProps(newProps) {
    const { location: { pathname }, onRouteChange } = this.props
    if (pathname !== newProps.location.pathname) {
      onRouteChange(newProps.location)
      this.getProfile()
    }
  }

  getProfile = () => {
    const {
      location,
      profile,
      oauth,
      username,
      loadProfile,
    } = this.props
    if (
      location.pathname !== '/logout/' &&
      !profile &&
      oauth &&
      username
    ) {
      loadProfile(username)
    }
  }

  render() {
    const { muiTheme: { baseTheme } } = this.props
    const style = {
      backgroundColor: baseTheme.palette.backgroundColor,
    }
    return (
      <main style={style} >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login/" component={Login} />
          <Route path="/logout/" component={Logout} />
          <Route path="/collections/" component={Collection} />
        </Switch>
      </main>
    )
  }
}


const mapStateToProps = (state) => {
  const root = state.app
  return {
    profile: root.profile,
    oauth: root.oauth,
    username: root.username,
  }
}

const mapDispatchToProps = dispatch => ({
  onRouteChange: location => dispatch(notifyRouteChange(location)),
  loadProfile: username => dispatch(getProfile(username)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(Container)))
