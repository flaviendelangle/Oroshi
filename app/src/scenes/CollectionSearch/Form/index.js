import React, { Component } from 'react'
import { reduxForm, Field, getFormValues } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSearch from 'material-ui/svg-icons/action/search'

import Search from '../Search'
import SearchOptions from '../SearchOptions'

import styles from './Form.scss'


export const FORM_ID = 'advancedSearchForm'

class Form extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    content: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dirty: PropTypes.bool,
    valid: PropTypes.bool,
    formValues: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    const { handleSubmit, onSubmit, formValues } = this.props
    if (nextProps.dirty && nextProps.valid && nextProps.formValues !== formValues) {
      handleSubmit(onSubmit)()
    }
  }

  render() {
    const {
      onSubmit,
      handleSubmit,
      type,
      content,
    } = this.props
    return (
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={styles.Form}
      >
        <Field
          name="query"
          component={Search}
          onRequestSearch={() => {}}
        />
        <SearchOptions type={type} content={content} />
        <FloatingActionButton
          className={styles.SubmitButton}
          type="submit"
        >
          <ActionSearch />
        </FloatingActionButton>
      </form>
    )
  }
}

const form = reduxForm({
  form: FORM_ID,
})(Form)

const mapStateToProps = state => ({
  formValues: getFormValues(FORM_ID)(state),
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(form)
