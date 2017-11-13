import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import injectTapEventPlugin from "react-tap-event-plugin"
import promiseMiddleware from 'redux-promise-middleware';
import WebFont from 'webfontloader';

import api from 'services/TheMovieDatabaseJS'
import Main from './Main'
import reducer from './reducer'
import './App.css';

const composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);

let store = composeStoreWithMiddleware(reducer);

injectTapEventPlugin();

WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});

api.set_config({
  api_key: 'de7ff1a87f9afdb1ccd29ad9a0738e31',
  language: 'en',
  include_adult: 'false'
});

class App extends Component {

    render() {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Provider store={store}>
            <Main store={store} />
          </Provider>
        </MuiThemeProvider>
      )
    }
}

export default App
