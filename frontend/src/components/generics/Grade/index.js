import React, { Component } from 'react';

const circle = {
  thickness: 10,
  diameter: 80,
  lineHeight: 20
};

const externalCircleStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: circle.diameter,
  height: circle.diameter,
  backgroundColor: '#90A4AE',
  borderRadius: '50%',
  boxShadow: '6px 6px 10px rgba(0,0,0,0.6)'
};

const innerCircleStyle = {
  position: 'absolute',
  top: circle.thickness,
  left: circle.thickness,
  width: (circle.diameter - 2*circle.thickness),
  height: circle.lineHeight,
  backgroundColor: '#ECEFF1',
  borderRadius: '50%',
  color: 'black',
  fontSize: circle.lineHeight,
  fontWeight: 'bold',
  padding: String(circle.diameter/2 - circle.thickness - circle.lineHeight/2) + 'px 0',
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
    if(this.value >= 6.67) {
      return '#1DE9B6';
    } else if(this.value > 3.33) {
      return '#FFCA28';
    } else {
      return '#D32F2F';
    }
  }
  
  get circleStyle() {
   return {
     ...this.props.style,
     position: 'relative',
     width: circle.diameter,
     height: circle.diameter
   };
  }
  
  get coverStyle() {
    const display = this.degree > 90 ? 'none' : 'block';
    return {
      display,
      position: 'absolute',
      top: 0,
      left: 0,
      width: (circle.diameter - 2*circle.thickness),
      height: (circle.diameter - 2*circle.thickness),
      backgroundColor: '#90A4AE'
    };
  }
  
  arcStyle = (counter) => {
    const angle = Math.min(counter*90, this.degree) - 45;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: (circle.diameter - 2*circle.thickness),
      height: (circle.diameter - 2*circle.thickness),
      borderRadius: '50%',
      border: String(circle.thickness) + 'px solid',
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