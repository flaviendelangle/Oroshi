import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../scenes/Home'
import Movies from '../scenes/Movies'
import Collection from '../scenes/Collection'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/movies' component={Movies}/>
      <Route path='/collections/:id' component={Collection}/>
    </Switch>
  </main>
);

export default Main
