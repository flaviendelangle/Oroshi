import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../scenes/Home/index'
import Movies from '../scenes/Movies/index'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/' component={Movies}/>
    </Switch>
  </main>
);

export default Main
