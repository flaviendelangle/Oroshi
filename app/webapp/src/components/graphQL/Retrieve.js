import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import tM from '../../services/content/type'


// eslint-disable-next-line
const Retrieve = ({ type, api_id: id, children }) => {
  return (
    <Query
      query={tM.read(type).queries().Retrieve}
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

Retrieve.propTypes = {
  type: PropTypes.string.isRequired,
  api_id: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
}


export default Retrieve
