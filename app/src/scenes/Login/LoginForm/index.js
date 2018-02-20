import React from 'react'
import { TextField } from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'

import * as _style from '../style'

export const FORM_NAME = 'LOGIN_FORM'

const required = value => (value ? undefined : 'Required')

const LoginForm = ({
  palette,
  onSwitch,
  mode,
  handleSubmit,
}) => {
  if (mode !== 'login') {
    return null
  }
  return (
    <form onSubmit={handleSubmit} >
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
        validate={[required]}
        type="password"
      />
      <RaisedButton
        style={_style.button}
        backgroundColor={_style.buttonBackground}
        type="submit"
        label="Sign In"
      />
      <RegisterButton palette={palette} onSwitch={onSwitch} />
    </form>
  )
}

LoginForm.propTypes = {
  palette: PropTypes.object.isRequired,
  onSwitch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  mode: PropTypes.string,
}

const RegisterButton = ({ palette, onSwitch }) => (
  <div style={_style.flatButton(palette)} >
    <span>{'Don\'t have an account?'}</span>
    <span
      role="button"
      tabIndex={0}
      style={_style.flatButtonLink}
      onClick={() => onSwitch('register')}
    >
      Sign In
    </span>
  </div>
)

RegisterButton.propTypes = {
  palette: PropTypes.object.isRequired,
  onSwitch: PropTypes.func.isRequired,
}

export default reduxForm({
  form: FORM_NAME,
})(LoginForm)
