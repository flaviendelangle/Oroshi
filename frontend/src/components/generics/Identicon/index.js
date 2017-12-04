import React from 'react'
import IdenticonGenerator from 'identicon.js'
import md5 from 'md5-hash'

const Identicon = ({ size, string }) => {
  const options = {
    size: parseInt(size, 10),
    background: [0,0,0,0],
  };
  const img = new IdenticonGenerator(md5(string), options).toString();
  
  return (
    <img
      width={size}
      height={size}
      src={'data:image/png;base64,' + img} alt={string}
    />
  );
  
};

export default Identicon;