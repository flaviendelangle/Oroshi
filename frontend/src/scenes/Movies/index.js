import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';


const buttonStyle = {
  margin: 'auto'
};

class Movies extends Component {
  
  launchNewModal() {
    console.log("OK");
  }
  
  render() {
    return (
      <div>
        <RaisedButton label="Add" primary={true} style={buttonStyle} onClick={this.launchNewModal}/>
      </div>
    )
  
  }
  
}

export default Movies;
