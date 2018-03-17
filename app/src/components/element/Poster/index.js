import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


import styles from './Poster.scss'


class Poster extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
    path: PropTypes.string,
    ratio: PropTypes.number,
  }

  static defaultProps = {
    ratio: 1,
  }

  onFinishLoading = (success) => {
    const { onLoad } = this.props
    if (onLoad) {
      onLoad(success)
    }
  }

  onLoad = () => this.onFinishLoading(true)

  onError = () => this.onFinishLoading(false)

  render() {
    const {
      path,
      title,
      ratio,
    } = this.props
    if (path) {
      return (
        <img
          src={path}
          alt="Poster"
          onLoad={this.onLoad}
          onError={this.onLoad}
          width={ratio * 185}
        />
      )
    }
    return (
      <div className={styles.DefaultPoster} >
        <span>
          { title }
        </span>
      </div>
    )
  }
}

export default Poster
