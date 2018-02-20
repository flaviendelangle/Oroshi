import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import WebFont from 'webfontloader'

import Container from '../components/appStructure/Container'

import store from '../reducers/store'

import theme from '../services/theme'
import tmdbApi from '../services/TheMovieDatabaseJS'
import { DEFAULT_LANGUAGE } from '../services/languages'


/**
 * Remove touch detail issues
 */
injectTapEventPlugin()

/**
 * Font settings
 */
WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif'],
  },
})

/**
 * Public APIs settings
 */
tmdbApi.setConfig({
  api_key: 'de7ff1a87f9afdb1ccd29ad9a0738e31',
  language: DEFAULT_LANGUAGE,
  include_adult: 'false',
})


const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)} >
    <Provider store={store} >
      <Container store={store} />
    </Provider>
  </MuiThemeProvider>
)

export default App
