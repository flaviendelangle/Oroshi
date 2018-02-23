import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import cx from 'classnames'

// import AVMovie from 'material-ui/svg-icons/av/movie'
// import HardwareTV from 'material-ui/svg-icons/hardware/tv'
import muiThemeable from 'material-ui/styles/muiThemeable'
// import ContentCreate from 'material-ui/svg-icons/content/create'


import CollectionCover from '../../../../components/generics/CollectionCover'

import styles from './CollectionBox.scss'

class CollectionBox extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    // muiTheme: PropTypes.object.isRequired,
    editing: PropTypes.bool,
  }

  get url() {
    const { data, editing } = this.props
    let baseURL = '/collections/'
    if (data.type === 'movies') {
      baseURL += 'movies/'
    } else if (data.type === 'tv_shows') {
      baseURL += 'tv_shows/'
    }
    baseURL += `${data.pk}/`
    if (editing) {
      baseURL += 'settings/'
    }
    return baseURL
  }

  render() {
    // const Icon = data.type === 'movies' ? AVMovie : HardwareTV
    /* const maskClasses = cx({
      'collection-editing-mask': true,
      invisible: !editing,
    }) */

    const { data: { cover_elements: covers, title } } = this.props
    return (
      <div className={styles.CollectionBox}>
        <Link to={this.url}>
          <CollectionCover covers={covers} />
          <div className={styles.Title} >
            {title}
          </div>
        </Link>
      </div>
    )
  }
}

export default muiThemeable()(CollectionBox)
