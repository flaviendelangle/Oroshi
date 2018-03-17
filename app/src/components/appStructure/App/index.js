import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'

import Container from '../Container/index'

import setup from '../../../setup'
import store from '../../../reducers/store'
import theme from '../../../services/theme'

const status = setup.run(React)

// eslint-disable-next-line no-console
console.log(`Application setup status: ${status}`)

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)} >
    <Provider store={store} >
      <Container store={store} />
    </Provider>
  </MuiThemeProvider>
)

export default App
