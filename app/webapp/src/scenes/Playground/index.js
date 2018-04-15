import React, { PureComponent } from 'react'

import Retrieve from '../../components/graphQL/Retrieve'


// eslint-disable-next-line react/prefer-stateless-function
class Playground extends PureComponent {
  render() {
    return (
      <Retrieve type="movies" api_id={2}>
        {(data) => {
          console.log(data)
          return null
        }}
      </Retrieve>
    )
  }
}

export default Playground
