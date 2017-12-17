import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { create, login } from 'services/actions/users';

import * as _style from './style';

class Login extends Component {
  
  state = {
    mouseOver: false,
    mode: 'login',
  };
  
  constructor(props) {
    super(props);
    if (this.props.oauth) {
      this.props.history.push('/');
    }
  }
  
  register = data => {
    return this.props.register(data).then(response => {
      if (response.value.error) {
        throw new SubmissionError(response.value.error);
      }
    })
  };
  
  login = data => {
    return this.props.login(data).then(response => {
      if (response.value.error) {
        throw new SubmissionError({
          password: response.value.error.error_description
        });
      } else {
        this.props.history.push('/');
      }
    });
  };
  
  handleMouseHover = mouseOver => {
    this.setState({ mouseOver });
  };
  
  switchMode = mode => {
    this.setState({ mode });
  };
  
  componentWillReceiveProps(newProps) {
    if (newProps.registerError) {
      console.log(newProps.registerError);
      //throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })
      //throw new SubmissionError(newProps.registerError);
    }
  }
  
  render() {
    const theme = this.props.muiTheme.palette;
    return (
      <Paper
        style={_style.paper(theme)}
        zDepth={this.state.mouseOver ? 5 : 3}
        onMouseEnter={() => this.handleMouseHover(true)}
        onMouseLeave={() => this.handleMouseHover(false)}
      >
        <LoginForm
          theme={theme}
          onSwitch={this.switchMode}
          onSubmit={this.login}
          mode={this.state.mode}
        />
        <RegisterForm
          theme={theme}
          onSwitch={this.switchMode}
          onSubmit={this.register}
          mode={this.state.mode}
        />
      </Paper>
    );
  }
  
}

const mapStateToProps = state => {
  const root = state.login.main;
  const appRoot = state.app;
  return {
    registerError: root.registerError,
    oauth: appRoot.oauth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    register: data => dispatch(create(data)),
    login: data => dispatch(login(data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Login));