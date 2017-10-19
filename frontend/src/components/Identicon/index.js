import React, { Component } from 'react'
import IdenticonGenerator from 'identicon.js'
import md5 from 'md5-hash'

class Identicon extends Component {
  
  state = {
    hash: '',
    identicon: ''
  };
  
  componentDidMount() {
    this.prepare();
  }
  
  componentWillReceiveProps() {
    this.prepare();
  }
  
  prepare = () => {
    const hash = md5(this.props.string);
    this.setState({ hash });
    this.setState({
      identicon: new IdenticonGenerator(hash, this.props.size).toString()
    });
  };
  
  render() {
    return (
      <img
        width={this.props.size}
        height={this.props.size}
        src={'data:image/png;base64,' + this.state.identicon} alt={this.props.string}
      />
    )
    
  }
}

export default Identicon;