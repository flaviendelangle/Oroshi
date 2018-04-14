import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'

import cx from 'classnames'

import Poster from '../Poster'
import FakePoster from '../FakePoster'
import Suggestions from './Suggestions'
import Footer from './Footer'
import Overlay from '../Overlay'

import styles from './Element.scss'


class Element extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    creationMode: PropTypes.bool, // RENAME
    layout: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    onRender: PropTypes.func,
    mode: PropTypes.string,
    style: PropTypes.object,
    isPublic: PropTypes.bool,
    footer: PropTypes.array,
    onClick: PropTypes.func,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps
    if (
      !prevState.data ||
      data.isInCollection() !== prevState.data.isInCollection()
    ) {
      return {
        data,
        isAdding: false,
      }
    }

    return {
      data,
    }
  }

  state = {
    isMouseOver: false,
    isAdding: false,
    isReady: false,
    posterFound: true,
    data: null, // eslint-disable-line react/no-unused-state
  }

  onMouseEnter = () => this.onMouseHover(true)

  onMouseLeave = () => this.onMouseHover(false)

  onMouseHover = (isMouseOver) => {
    this.setState(() => ({ isMouseOver }))
  }

  onPosterLoad = (posterFound) => {
    this.setState(() => ({ posterFound, isReady: true }))
  }

  onSave = () => {
    const { collection, data, onSave } = this.props
    if (!this.state.isAdding) {
      onSave(collection, data)
    }
  }

  onDestroy = () => {
    const { collection, data, onDestroy } = this.props
    onDestroy(collection, data)
  }

  getAction = (actionName) => {
    const action = this.props[actionName]
    if (
      typeof action === 'string' ||
      action instanceof String
    ) {
      const ActionComponent = this.getActionComponent(action)
      return (
        <span>
          <ActionComponent {...this.props} />
        </span>
      )
    }
    return (
      <span>
        {action}
      </span>
    )
  }

  getActionComponent = (action) => {
    switch (action) {
      case 'suggestions':
        return Suggestions
      default:
        return null
    }
  }

  getTopRightAction = () => this.getAction('topRightAction')

  getTopLeftAction = () => this.getAction('topLeftAction')

  /**
   * Check if we are in test mode
   */
  isTesting = () => this.props.mode === 'test'

  render() {
    const {
      style,
      creationMode,
      data,
      footer,
    } = this.props
    const { isMouseOver, isReady, posterFound } = this.state
    const elementClasses = cx({
      [styles.Element]: true,
      [styles.ElementInCollection]: (data.isInCollection() && creationMode),
      [styles.ElementNotInCollection]: (!data.isInCollection() && creationMode),
      [styles.ElementReady]: isReady,
    })

    return (
      <div className={elementClasses} style={style} >
        <div className={styles.Container}>
          <Paper
            zDepth={3}
            className={styles.Content}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            {
              posterFound ?
                <Poster
                  path={data.getFullPosterPath()}
                  title={data.getTitle()}
                  onLoad={this.onPosterLoad}
                /> :
                <FakePoster creationMode={false} ratio={1} />
            }
            <Overlay
              {...this.props}
              onSave={this.onSave}
              onDestroy={this.onDestroy}
              topRightAction={this.getTopRightAction()}
              topLeftAction={this.getTopLeftAction()}
              isMouseOver={isMouseOver}
            />
          </Paper>
        </div>
        <Footer footer={footer} />
      </div>
    )
  }
}

export default Element
