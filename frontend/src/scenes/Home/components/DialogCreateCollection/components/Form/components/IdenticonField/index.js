import React, { Component } from 'react'

import Identicon from '../../../../../../../../components/Identicon'

class IdenticonField extends Component {
  
  componentDidUpdate() {
    this.props.input.onChange(this.props.string);
  }
  
  render() {
    return (
      <Identicon string={this.props.input.value} size={this.props.size} />

    );
  }
}

export default IdenticonField;