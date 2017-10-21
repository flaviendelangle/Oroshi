import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'

import Home from '../scenes/Home'
import Movies from '../scenes/CollectionMovies'
import Movie from '../scenes/Movie'
import Collection from '../scenes/CollectionSettings'
import { notifyRouteChange } from '../services/actions/router'


class Main extends Component {
  
  componentWillReceiveProps(newProps) {
    if(this.props.location.pathname !== newProps.location.pathname) {
      this.props.notifyRouteChange(newProps.location);
    }
  }
  
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/collections/:collection_id/movies/' component={Movies} />
          <Route path='/collections/:collection_id/' component={Collection} />
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
)(Main));