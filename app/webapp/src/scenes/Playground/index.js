import React, { PureComponent } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const GET_MOVIES = gql`
    query {
        movies  {
            api_id
            titles {
                id
                language
                title
            }
        }
    }
`

console.log(GET_MOVIES)


// eslint-disable-next-line react/prefer-stateless-function
class Playground extends PureComponent {
  render() {
    return (
      <Query query={GET_MOVIES}>
        {({ data }) => {
          console.log(data)
          return null
        }}
      </Query>
    )
  }
}

export default Playground
