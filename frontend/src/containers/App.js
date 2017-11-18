import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import injectTapEventPlugin from "react-tap-event-plugin"
import WebFont from 'webfontloader';

import api from 'services/TheMovieDatabaseJS';
import Main from './Main';
import store from './reducer';
import theme from 'services/theme';
import './App.css';


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
        <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
          <Provider store={store}>
            <Main store={store} />
          </Provider>
        </MuiThemeProvider>
      )
    }
}

export default App
