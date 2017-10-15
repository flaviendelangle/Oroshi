import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Identicon from 'identicon.js'
import md5 from 'md5-hash'

import './style.css';


class CollectionBox extends Component {
  
  constructor(props) {
    super(props);
    const hash = md5(this.props.data.title);
    this.identicon = new Identicon(hash, 200).toString();
  }
  
  render() {
    return (
      <Link to='/movies/'>
        <div className="collection-box">
          <div className="collection-icon">
            <img width="200" height="200" src={'data:image/png;base64,' + this.identicon} alt={this.props.data.title}/>
          </div>
          <div className="collection-title">{this.props.data.title}</div>
        </div>
      </Link>
    )
    
  }
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionBox);