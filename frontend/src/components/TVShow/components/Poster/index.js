import React  from 'react'

import { path as _path } from 'services/TheMovieDatabaseJS/images'

import * as _style from './style';

const Poster = ({ path, title }) => {
  
  const url = _path + '/w185' + path;
  
  if (path) {
    return (
      <img src={url} alt="Poster" />
    );
  }
  return (
    <div style={_style.defaultPoster}>
      <span style={_style.span}>
        {title}
      </span>
    </div>
  );
};

export default Poster;