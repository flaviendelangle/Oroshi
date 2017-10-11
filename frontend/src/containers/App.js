import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Header from './Header'
import Main from './Main'
import reducer from './reducer'
import './App.css';

let store = createStore(reducer);

const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <div>
        <Header />
        <Main />
      </div>
    </Provider>
  </MuiThemeProvider>
);

export default App
