import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import RegularOverlay from './RegularOverlay'
import ClickableOverlay from './ClickableOverlay'

import styles from './Overlay.scss'


const OVERLAYS = {
  regular: RegularOverlay,
  clickable: ClickableOverlay,
}

class Overlay extends Component {
  static propTypes = {
    overlay: PropTypes.string,
    mode: PropTypes.string,
    isTesting: PropTypes.bool,
  }

  static defaultProps = {
    overlay: 'regular',
  }

  state = {
    show: false,
    waiting: false,
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isMouseOver) {
      this.setState({ show: true, waiting: false })
    } else {
      this.setState({ waiting: true })
      this.timeout = setTimeout(() => {
        if (this.state.waiting) {
          this.setState({ show: false, waiting: false })
        }
      }, 300)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  getOverlay = () => OVERLAYS[this.props.overlay]

  isTesting = () => this.props.mode === 'test'

  timeout = null

  render() {
    const { show } = this.state
    if (
      !show &&
      !this.isTesting()
    ) {
      return null
    }

    const Element = this.getOverlay()
    const overlayClasses = cx({
      [styles.Overlay]: true,
      [styles.OverlayTestingMode]: this.isTesting(),
    })

    return (
      <div className={overlayClasses}>
        <Element {...this.props} />
      </div>
    )
  }
}

export default Overlay
