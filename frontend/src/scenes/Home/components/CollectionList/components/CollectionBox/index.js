import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ContentCreate from 'material-ui/svg-icons/content/create';

import Identicon from 'identicon.js'
import md5 from 'md5-hash'

import './style.css';

class CollectionBox extends Component {
  
  constructor(props) {
    super(props);
    const hash = md5(this.props.data.title);
    this.identicon = new Identicon(hash, 200).toString();
  }
  
  url() {
    if(this.props.editing) {
      return '/collections/' + this.props.data.pk;
    }
    return '/movies/' + this.props.data.pk + '/';
  }
  
  render() {
    return (
      <Link to={this.url()}>
        <div className="collection-box">
          <div className="collection-icon">
            <div className={ 'collection-editing-mask ' + (this.props.editing ? '' : 'invisible') } >
              <ContentCreate color="white" className="editing-icon" />
            </div>
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