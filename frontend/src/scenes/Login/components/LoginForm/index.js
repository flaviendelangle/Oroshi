import React  from 'react';
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form'

import * as _style from '../../style';

export const FORM_NAME = 'LOGIN_FORM';

const required = value => value ? undefined : 'Required';

let LoginForm = ({ theme, onSwitch, mode, handleSubmit }) => {
  if (mode !== 'login') {
    return null;
  }
  return (
    <form onSubmit={handleSubmit}>
      <Field
        floatingLabelStyle={_style.input(theme)}
        inputStyle={_style.input(theme)}
        underlineStyle={_style.input(theme)}
        floatingLabelText="Username"
        name="username"
        component={TextField}
        validate={[ required ]}
      />
      <Field
        floatingLabelStyle={_style.input(theme)}
        inputStyle={_style.input(theme)}
        underlineStyle={_style.input(theme)}
        floatingLabelText="Password"
        name="password"
        component={TextField}
        validate={[ required ]}
        type="password"
      />
      <RaisedButton
        style={_style.button}
        backgroundColor={_style.buttonBackground}
        type="submit"
        label="Sign In"
      />
      <RegisterButton theme={theme} onSwitch={onSwitch}/>
    </form>
  );
};

const RegisterButton = ({ theme, onSwitch }) => (
  <div style={_style.flatButton(theme)}>
    <span>Don't have an account? </span>
    <span
      style={_style.flatButtonLink}
      onClick={_ => onSwitch('register')}
    >
      Sign In
    </span>
  </div>
);

LoginForm = reduxForm({
  form: FORM_NAME
})(LoginForm);

export default LoginForm;