import React from 'react'
import { TextField } from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'

import styles from '../Login.scss'


export const FORM_NAME = 'LOGIN_FORM'

const required = value => (value ? undefined : 'Required')

const LoginForm = ({
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
        validate={[required]}
        type="password"
      />
      <RaisedButton
        className={styles.Button}
        type="submit"
        label="Sign In"
      />
      <RegisterButton onSwitch={onSwitch} />
    </form>
  )
}

LoginForm.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  mode: PropTypes.string,
}

const RegisterButton = ({ onSwitch }) => (
  <div className={styles.FlatButton} >
    <span>{'Don\'t have an account?'}</span>
    <span
      role="button"
      tabIndex={0}
      className={styles.Link}
      onClick={() => onSwitch('register')}
    >
      Sign In
    </span>
  </div>
)

RegisterButton.propTypes = {
  onSwitch: PropTypes.func.isRequired,
}

export default reduxForm({
  form: FORM_NAME,
})(LoginForm)
