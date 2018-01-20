import React  from 'react';
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form'

import * as _style from '../../style';

export const FORM_NAME = 'REGISTER_FORM';

const required = (value) => value ? undefined : 'Required';
const minLength8 = (value) => value.length >= 8 ? undefined : 'Must be at least 8 characters long';
const email = (value) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
  return undefined;
};

let RegisterForm = ({ theme, onSwitch, mode, handleSubmit }) => {
  if (mode !== 'register') {
    return null;
  }
  return (
    <form onSubmit={handleSubmit} >
      <Field
        floatingLabelStyle={_style.input(theme)}
        inputStyle={_style.input(theme)}
        underlineStyle={_style.input(theme)}
        floatingLabelText="Email"
        name="email"
        component={TextField}
        validate={[ required, email ]}
        type="email"
      />
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
        validate={[ required, minLength8 ]}
        type="password"
      />
      <RaisedButton
        style={_style.button}
        backgroundColor={_style.buttonBackground}
        type="submit"
        label="Sign Up"
      />
      <LoginButton theme={theme} onSwitch={onSwitch} />
    </form>
  );
};

const LoginButton = ({ theme, onSwitch }) => (
  <div style={_style.flatButton(theme)} >
    <span>Already have an account? </span>
    <span
      style={_style.flatButtonLink}
      onClick={() => onswitch ('login')}
    >
      Sign In
    </span>
  </div>
);

RegisterForm = reduxForm({
  form: FORM_NAME
})(RegisterForm);

export default RegisterForm;