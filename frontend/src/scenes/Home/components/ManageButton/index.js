import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';

const containerStyle = {
  textAlign: 'center'
};


class ManageButton extends Component {
  
  getLabel() {
    return this.props.editing ? 'Finished' : 'Manage';
  }
  
  render() {
    return (
      <div style={containerStyle}>
        <RaisedButton label={this.getLabel()} onClick={this.props.onClick}/>
      </div>
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
)(ManageButton);