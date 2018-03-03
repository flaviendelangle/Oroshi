import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CollectionCover from '../../../../components/generics/CollectionCover'

import styles from './CoverCustomization.scss'


class CoverCustomization extends Component {
  static propTypes = {
    collection: PropTypes.object.isRequired,
  }

  state = {
    covers: [],
  }

  componentWillMount() {
    const { collection: { cover_elements: covers } } = this.props
    this.setState(() => ({ covers }))
  }

  render() {
    const { covers } = this.state
    return (
      <div className={styles.CoverCustomization}>
        <CollectionCover covers={covers} ratio={1} />
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoverCustomization)
