import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import Container from '../Container/index'

import setup, { client } from '../../../setup'
import store from '../../../reducers/store'
import theme from '../../../services/theme'

const status = setup.run(React)

// eslint-disable-next-line no-console
console.log(`Application setup status: ${status}`)

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)} >
    <Provider store={store} >
      <ApolloProvider client={client}>
        <Container store={store} />
      </ApolloProvider>
    </Provider>
  </MuiThemeProvider>
)

export default App
