import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../scenes/Home'
import Movies from '../scenes/CollectionMovies'
import Movie from '../scenes/Movie'
import Collection from '../scenes/CollectionSettings'


class Main extends Component {
  
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

export default Main
