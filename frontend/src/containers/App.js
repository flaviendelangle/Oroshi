import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { withRouter } from 'react-router'
import injectTapEventPlugin from "react-tap-event-plugin"
import promiseMiddleware from 'redux-promise-middleware';

import Header from '../components/Header'
import Main from './Main'
import reducer from './reducer'
import { updateLocation } from './actions'
import './App.css';

const composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);
let store = composeStoreWithMiddleware(reducer);

injectTapEventPlugin();


class App extends Component {

    render() {
      return (
        <MuiThemeProvider>
          <Provider store={store}>
            <Root/>
          </Provider>
        </MuiThemeProvider>
      )
    }
}

class Root extends Component {
  
  constructor(props) {
    super(props);
    this.props.history.listen((location, action) => {
      this.props.updateLocation(location, action);
    });
  }
  
  render() {
    return (
      <div>
        <Main />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateLocation: (newLocation, action) => {
      dispatch(updateLocation(newLocation, action));
    },
  }
};

Root = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Root));

export default App
