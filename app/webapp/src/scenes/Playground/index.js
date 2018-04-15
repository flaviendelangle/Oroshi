import React, { PureComponent } from 'react'

import Retrieve from '../../components/graphQL/Retrieve'
// import { get } from '../../../../common/lib/pluginLoader'


// eslint-disable-next-line react/prefer-stateless-function
class Playground extends PureComponent {
  componentDidMount() {
    // get('movies').actions.search({}, 'lord of').then(console.log)
  }

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
