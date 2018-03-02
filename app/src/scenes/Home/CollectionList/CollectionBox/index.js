import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import AVMovie from 'material-ui/svg-icons/av/movie'
import HardwareTV from 'material-ui/svg-icons/hardware/tv'

import CollectionCover from '../../../../components/generics/CollectionCover'

import styles from './CollectionBox.scss'


class CollectionBox extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
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
    const { data: { cover_elements: covers, title, type } } = this.props
    const Icon = type === 'movies' ? AVMovie : HardwareTV
    return (
      <div className={styles.CollectionBox}>
        <Link to={this.url}>
          <CollectionCover covers={covers} />
          <Icon className={styles.Icon} />
          <div className={styles.Title} >
            {title}
          </div>
        </Link>
      </div>
    )
  }
}

export default CollectionBox
