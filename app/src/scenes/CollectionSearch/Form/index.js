import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'

import Search from '../Search'
import SearchOptions from '../SearchOptions'


export const FORM_ID = 'advancedSearchForm'

// eslint-disable-next-line
class Form extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    content: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {
      onSubmit,
      handleSubmit,
      type,
      content,
    } = this.props
    return (
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="query"
          component={Search}
          onRequestSearch={() => {}}
        />
        <SearchOptions type={type} content={content} />
      </form>
    )
  }
}

export default reduxForm({
  form: FORM_ID,
})(Form)
