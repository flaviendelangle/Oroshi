import React from 'react'
import PropTypes from 'prop-types'

import { path as _path } from 'services/TheMovieDatabaseJS/images'

import * as _style from './style'

const Poster = ({
  path,
  title,
  onLoad,
}) => {
  if (path) {
    const url = `${_path}/w185${path}`
    return (
      <img
        src={url}
        alt="Poster"
        onLoad={() => onLoad(true)}
        onError={() => onLoad(false)}
      />
    )
  }
  setTimeout(() => onLoad(false))
  return (
    <div style={_style.defaultPoster} >
      <span style={_style.span} >
        {title}
      </span>
    </div>
  )
}

Poster.propTypes = {
  title: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  path: PropTypes.string,
}

export default Poster
