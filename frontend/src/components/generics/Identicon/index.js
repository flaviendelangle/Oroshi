import React, { Component } from 'react'
import IdenticonGenerator from 'identicon.js'
import md5 from 'md5-hash'

class Identicon extends Component {
  
  render() {
    const img = new IdenticonGenerator(md5(this.props.string), this.props.size).toString();
    return (
      <img
        width={this.props.size}
        height={this.props.size}
        src={'data:image/png;base64,' + img} alt={this.props.string}
      />
    )
    
  }
}

export default Identicon;