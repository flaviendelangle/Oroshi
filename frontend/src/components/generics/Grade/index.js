import React from 'react';

import * as _style from './style';


const Grade = ({ className, ...props }) => {
  
  let grade;
  let degree;
  
  if (!props.value) {
    degree = 360;
    grade = '?';
  } else {
    degree = parseInt(props.value*36, 10);
    grade = String(props.value);
    if (Math.abs(props.value % 1) < 0.05) {
      grade += '.0';
    }
  }
  
  return (
    <div style={_style.circle} className={className}>
      <div style={_style.externalCircle}>
      </div>
      <div style={_style.innerCircle}>
        {grade}
      </div>
      <Arc quarter={1} degree={degree} {...props} />
      <Arc quarter={2} degree={degree} {...props} />
      <Arc quarter={3} degree={degree} {...props} />
      <Arc quarter={4} degree={degree} {...props} />
      <div style={_style.cover(degree)}>
      </div>
    </div>
  );
  
};

const Arc = (props) => (
  <div style={_style.arc(props)}>
  </div>
);


export default Grade;
