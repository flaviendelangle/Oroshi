import React from 'react';

import * as _style from './style';


const Grade = ({ style, ...props }) => {
  
  return (
    <div style={style.circle(style)}>
      <div style={_style.externalCircle}>
      </div>
      <div style={_style.innerCircle}>
        {props.value}
      </div>
      <Arc quarter={1} {...props} />
      <Arc quarter={2} {...props} />
      <Arc quarter={3} {...props} />
      <Arc quarter={4} {...props} />
      <div style={_style.cover(props)}>
      </div>
    </div>
  );
  
};

const Arc = (props) => (
  <div style={_style.arc(props)}>
  </div>
);


export default Grade;
