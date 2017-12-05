import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Home from 'scenes/Home';
import Login from 'scenes/Login';
import CollectionMovies from 'scenes/CollectionMovies';
import CollectionTVShows from 'scenes/CollectionTVShows';

import CollectionMoviesSettings from 'scenes/CollectionMoviesSettings';
import CollectionTVShowsSettings from 'scenes/CollectionTVShowsSettings';
import { notifyRouteChange } from 'services/actions/router';
import { getProfile } from 'services/actions/users';

class Main extends Component {
  
  get style() {
    return {
      backgroundColor: this.props.muiTheme.baseTheme.palette.backgroundColor
    }
  }
  
  componentDidMount() {
    if(!this.props.profile && this.props.oauth && this.props.username) {
      this.props.getProfile(this.props.username);
    }
  }
  
  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      this.props.notifyRouteChange(newProps.location);
    }
  }
  
  render() {
    return (
      <main style={this.style}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login/' component={Login} />
          
          <Route path='/collections/movies/:collection_id/settings/' component={CollectionMoviesSettings} />
          <Route path='/collections/tv_shows/:collection_id/settings/' component={CollectionTVShowsSettings} />
          <Route path='/collections/movies/:collection_id/' component={CollectionMovies} />
          <Route path='/collections/tv_shows/:collection_id/' component={CollectionTVShows} />
          
        </Switch>
      </main>
    );
  }
}


const mapStateToProps = state => {
  const root = state.app;
  return {
    profile: root.profile,
    oauth: root.oauth,
    username: root.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notifyRouteChange: location => dispatch(notifyRouteChange(location)),
    getProfile: username => dispatch(getProfile(username))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Main)));