import React from 'react'
import PropTypes from 'prop-types'


import styles from './Poster.scss'

const Poster = ({
  path,
  title,
  onLoad,
  ratio,
}) => {
  if (path) {
    return (
      <img
        src={path}
        alt="Poster"
        onLoad={() => onLoad && onLoad(true)}
        onError={() => onLoad && onLoad(false)}
        width={ratio * 185}
      />
    )
  }
  setTimeout(() => onLoad && onLoad(false))
  return (
    <div className={styles.DefaultPoster} >
      <span>
        {title}
      </span>
    </div>
  )
}

Poster.propTypes = {
  title: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  path: PropTypes.string,
  ratio: PropTypes.number,
}

Poster.defaultProps = {
  ratio: 1,
}

export default Poster
