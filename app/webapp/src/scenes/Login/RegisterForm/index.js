import React from 'react'
import { TextField } from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'

import styles from '../Login.scss'


export const FORM_NAME = 'REGISTER_FORM'

const required = value => (value ? undefined : 'Required')

const minLength8 = value => (value.length >= 8 ?
  undefined :
  'Must be at least 8 characters long')

const email = (value) => {
  if (
    value &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return 'Invalid email address'
  }
  return undefined
}

const RegisterForm = ({
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
        className={styles.Input}
        floatingLabelText="Email"
        name="email"
        component={TextField}
        validate={[required, email]}
        type="email"
      />
      <Field
        className={styles.Input}
        floatingLabelText="Username"
        name="username"
        component={TextField}
        validate={[required]}
      />
      <Field
        className={styles.Input}
        floatingLabelText="Password"
        name="password"
        component={TextField}
        validate={[required, minLength8]}
        type="password"
      />
      <RaisedButton
        className={styles.Button}
        type="submit"
        label="Sign Up"
      />
      <LoginButton onSwitch={onSwitch} />
    </form>
  )
}

RegisterForm.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  mode: PropTypes.string,
}

const LoginButton = ({ onSwitch }) => (
  <div className={styles.FlatButton} >
    <span>Already have an account? </span>
    <span
      role="button"
      tabIndex={0}
      className={styles.Link}
      onClick={() => onSwitch('login')}
    >
      Sign In
    </span>
  </div>
)

LoginButton.propTypes = {
  onSwitch: PropTypes.func.isRequired,
}

export default reduxForm({
  form: FORM_NAME,
})(RegisterForm)
