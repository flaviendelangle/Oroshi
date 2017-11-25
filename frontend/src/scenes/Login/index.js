import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

import RegisterForm from './components/RegisterForm';
import { create } from 'services/actions/users';

import * as _style from './style';

class Login extends Component {
  
  state = {
    mouseOver: false,
    mode: 'register',
  };
  
  register = data => {
    this.props.register(data);
  };
  
  handleMouseHover = mouseOver => {
    this.setState({ mouseOver });
  };
  
  switchMode = mode => {
    this.setState({ mode });
  };
  
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

const LoginForm = ({ theme, onSwitch, mode }) => {
  if(mode !== 'login') {
    return null;
  }
  return (
    <div>
      <TextField
        floatingLabelStyle={_style.input(theme)}
        inputStyle={_style.input(theme)}
        underlineStyle={_style.input(theme)}
        floatingLabelText="Username"
      />
      <TextField
        floatingLabelStyle={_style.input(theme)}
        inputStyle={_style.input(theme)}
        underlineStyle={_style.input(theme)}
        floatingLabelText="Password"
        type="password"
      />
      <RaisedButton
        style={_style.button}
        backgroundColor={_style.buttonBackground}
        label="Sign In"
      />
      <RegisterButton theme={theme} onSwitch={onSwitch}/>
    </div>
  );
};



const RegisterButton = ({ theme, onSwitch }) => (
  <div style={_style.flatButton(theme)}>
    <span>Don't have an account? </span>
    <span
      style={_style.flatButtonLink}
      onClick={() => onSwitch('register')}
    >
      Sign Up
    </span>
  </div>
);

const mapStateToProps = state => {
  const root = state.login.main;
  return {
    registerError: root.registerError
  }
};

const mapDispatchToProps = dispatch => {
  return {
    register: data => dispatch(create(data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Login));