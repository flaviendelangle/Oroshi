import React, { Component } from 'react'

import Identicon from 'components/Identicon'

class IdenticonField extends Component {
  
  render() {
    return (
      <Identicon string={this.props.string} size={this.props.size} />
    );
  }
}

export default IdenticonField;
