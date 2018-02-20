import React from 'react'
import { TextField } from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'

import * as _style from '../style'

export const FORM_NAME = 'REGISTER_FORM'

const required = value => (value ? undefined : 'Required')

const minLength8 = value => (value.length >= 8 ?
  undefined :
  'Must be at least 8 characters long')

const email = (value) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address'
  }
  return undefined
}

const RegisterForm = ({
  palette,
  onSwitch,
  mode,
  handleSubmit,
}) => {
  if (mode !== 'register') {
    return null
  }
  return (
    <form onSubmit={handleSubmit} >
      <Field
        floatingLabelStyle={_style.input(palette)}
        inputStyle={_style.input(palette)}
        underlineStyle={_style.input(palette)}
        floatingLabelText="Email"
        name="email"
        component={TextField}
        validate={[required, email]}
        type="email"
      />
      <Field
        floatingLabelStyle={_style.input(palette)}
        inputStyle={_style.input(palette)}
        underlineStyle={_style.input(palette)}
        floatingLabelText="Username"
        name="username"
        component={TextField}
        validate={[required]}
      />
      <Field
        floatingLabelStyle={_style.input(palette)}
        inputStyle={_style.input(palette)}
        underlineStyle={_style.input(palette)}
        floatingLabelText="Password"
        name="password"
        component={TextField}
        validate={[required, minLength8]}
        type="password"
      />
      <RaisedButton
        style={_style.button}
        backgroundColor={_style.buttonBackground}
        type="submit"
        label="Sign Up"
      />
      <LoginButton theme={palette} onSwitch={onSwitch} />
    </form>
  )
}

RegisterForm.propTypes = {
  palette: PropTypes.object.isRequired,
  onSwitch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  mode: PropTypes.string,
}

const LoginButton = ({ palette, onSwitch }) => (
  <div style={_style.flatButton(palette)} >
    <span>Already have an account? </span>
    <span
      role="button"
      tabIndex={0}
      style={_style.flatButtonLink}
      onClick={() => onSwitch('login')}
    >
      Sign In
    </span>
  </div>
)

LoginButton.propTypes = {
  palette: PropTypes.object.isRequired,
  onSwitch: PropTypes.func.isRequired,
}

export default reduxForm({
  form: FORM_NAME,
})(RegisterForm)
