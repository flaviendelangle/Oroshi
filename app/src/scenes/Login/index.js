import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { create, login as _login } from 'services/actions/users';

import * as _style from './style';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
    oauth: PropTypes.object,
  };

  constructor(props) {
    super(props);
    if (this.props.oauth) {
      this.props.history.push('/');
    }
  }

  state = {
    mouseOver: false,
    mode: 'login',
  };

  componentWillReceiveProps(newProps) {
    if (newProps.registerError) {
      // throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })
      // throw new SubmissionError(newProps.registerError);
    }
  }

  register = (data) => {
    const { register } = this.props;
    return register(data).then((response) => {
      if (response.value.error) {
        throw new SubmissionError(response.value.error);
      }
    })
  };

  login = (data) => {
    const { login, history } = this.props;
    return login(data).then((response) => {
      if (response.value.error) {
        throw new SubmissionError({
          password: response.value.error.error_description,
        });
      } else {
        history.push('/');
      }
    });
  };

  handleMouseHover = (mouseOver) => {
    this.setState({ mouseOver });
  };

  switchMode = (mode) => {
    this.setState({ mode });
  };

  render() {
    const { muiTheme: { palette } } = this.props;
    const { mouseOver, mode } = this.state;
    return (
      <Paper
        style={_style.paper(palette)}
        zDepth={mouseOver ? 5 : 3}
        onMouseEnter={() => this.handleMouseHover(true)}
        onMouseLeave={() => this.handleMouseHover(false)}
      >
        <LoginForm
          palette={palette}
          onSwitch={this.switchMode}
          onSubmit={this.login}
          mode={mode}
        />
        <RegisterForm
          palette={palette}
          onSwitch={this.switchMode}
          onSubmit={this.register}
          mode={mode}
        />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  const root = state.login.main;
  const appRoot = state.app;
  return {
    registerError: root.registerError,
    oauth: appRoot.oauth,
  }
};

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(create(data)),
  login: data => dispatch(_login(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(Login));
