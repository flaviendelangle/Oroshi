import React, { Component } from 'react';

const externalCircleStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 80,
  height: 80,
  backgroundColor: '#90A4AE',
  borderRadius: '50%',
  boxShadow: '6px 6px 10px rgba(0,0,0,0.5)'
};

const innerCircleStyle = {
  position: 'absolute',
  top: 15,
  left: 15,
  width: 50,
  height: 20,
  backgroundColor: '#ECEFF1',
  borderRadius: '50%',
  color: 'black',
  fontSize: 20,
  fontWeight: 'bold',
  padding: '15px 0',
  textAlign: 'center',
};

class Grade extends Component {
  
  get value() {
    return this.props.value;
  }
  
  get degree() {
    return parseInt(this.props.value*36, 10);
  }
  
  get color() {
    if(this.value >= 7) {
      return '#1DE9B6';
    } else if(this.value >= 5) {
      return '#FFCA28';
    } else {
      return '#D32F2F';
    }
  }
  
  get circleStyle() {
   return {
     ...this.props.style,
     position: 'relative',
     width: 80,
     height: 80
   };
  }
  
  get coverStyle() {
    const display = this.degree > 90 ? 'none' : 'block';
    return {
      display,
      position: 'absolute',
      top: 0,
      left: 0,
      width: 60,
      height: 60,
      backgroundColor: '#90A4AE'
    };
  }
  
  arcStyle = (counter) => {
    const angle = Math.min(counter*90, this.degree) - 45;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 50,
      height: 50,
      borderRadius: '50%',
      border: '15px solid',
      borderColor: 'transparent ' + this.color + ' transparent transparent',
      transform: 'rotate(' + angle + 'deg)'
    };
  };

  render() {
    return (
      <div style={this.circleStyle}>
        <div style={externalCircleStyle}>
        </div>
        <div style={innerCircleStyle}>
          {this.value}
        </div>
        <div style={this.arcStyle(1)}>
        </div>
        <div style={this.arcStyle(2)}>
        </div>
        <div style={this.arcStyle(3)}>
        </div>
        <div style={this.arcStyle(4)}>
        </div>
        <div style={this.coverStyle}>
        </div>
      </div>
    );
  }
  
}

export default Grade;