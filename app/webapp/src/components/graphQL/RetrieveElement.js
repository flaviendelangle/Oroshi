import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { queries } from './index'


// eslint-disable-next-line
const RetrieveElement = ({ type, api_id: id, children }) => {
  return (
    <Query
      query={queries(type).Retrieve}
      variables={{ api_id: id }}
    >
      {({ loading, data }) => {
        if (loading) {
          return null
        }
        return children(data[Object.keys(data)[0]])
      }}
    </Query>
  )
}

RetrieveElement.propTypes = {
  type: PropTypes.string.isRequired,
  api_id: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
}


export default RetrieveElement
