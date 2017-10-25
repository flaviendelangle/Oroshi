import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';

import IdenticonField from './components/IdenticonField'

import './style.css'

class CollectionType extends Component {
  
  state = {
    identiconString: ''
  };
  
  handleOnChange = () => {
    this.props.onChange(this.state.identiconString);
  };
  
  reloadIdenticon = () => {
    this.setState({identiconString: Math.random().toString(36).substr(2, 5)});
    this.handleOnChange();
  };
  
  componentDidMount() {
    this.handleOnChange();
  }
  
  render() {
    return (
      <div>
        <div>Here is a default visual for your new collection. You can generate another if you want !</div>
        <div style={{margin: '30px 0 0 0', textAlign: 'center'}}>
          <div style={{display: 'inline-block', verticalAlign: 'middle'}}>
            <IdenticonField size="120" string={this.state.identiconString}/>
          </div>
          <div style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: 20}}>
            <IconButton tooltip="New Icon" onClick={this.reloadIdenticon}>
              <NavigationRefresh />
            </IconButton>
          </div>
        </div>
      </div>
    );
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
)(CollectionType);