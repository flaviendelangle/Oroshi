import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';

const containerStyle = {
  textAlign: 'center',
  marginBottom: 20
};


class ManageButton extends Component {
  
  getLabel = () => this.props.editing ? 'Finished' : 'Manage';

  render() {
    return (
      <div style={containerStyle} >
        <RaisedButton label={this.getLabel()} onClick={this.props.onClick} />
      </div>
    )
    
  }
  
}

export default ManageButton;