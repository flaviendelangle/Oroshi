import React from 'react';

import * as _style from './style';


const Grade = ({ className, ...props }) => {
  
  const degree = parseInt(props.value*36, 10);
  
  return (
    <div style={_style.circle} className={className}>
      <div style={_style.externalCircle}>
      </div>
      <div style={_style.innerCircle}>
        {props.value}
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
