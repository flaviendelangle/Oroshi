import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Home from 'scenes/Home';
import CollectionMovies from 'scenes/CollectionMovies';
import CollectionTVShows from 'scenes/CollectionTVShows';
import Movie from 'scenes/Movie';
import CollectionMoviesSettings from 'scenes/CollectionMoviesSettings';
import CollectionTVShowsSettings from 'scenes/CollectionTVShowsSettings';
import { notifyRouteChange } from 'services/actions/router';

class Main extends Component {
  
  get style() {
    return {
      backgroundColor: this.props.muiTheme.baseTheme.palette.backgroundColor
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
          <Route path='/collections/movies/:collection_id/settings/' component={CollectionMoviesSettings} />
          <Route path='/collections/tv_shows/:collection_id/settings/' component={CollectionTVShowsSettings} />
          <Route path='/collections/movies/:collection_id/' component={CollectionMovies} />
          <Route path='/collections/tv_shows/:collection_id/' component={CollectionTVShows} />
          <Route path='/movies/:movie_id/' component={Movie} />
        </Switch>
      </main>
    );
  }
}


const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    notifyRouteChange: location => dispatch(notifyRouteChange(location))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Main)));