import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';


export default class Component extends React.Component {
  
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <RaisedButton
          label={this.props.label}
          primary={true}
          onClick={() => this.refs.input.click()}
        />
        <input
          type="file"
          style={{display: 'none'}}
          ref="input"
          accept=".csv"
        />
      </div>
    );
  }
  
}