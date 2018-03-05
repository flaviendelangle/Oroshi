import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'

import cx from 'classnames'

import Poster from '../Poster'
import FakePoster from '../FakePoster'
import Suggestions from './Suggestions'
import Overlay from '../Overlay'

import styles from './Element.scss'


class Element extends Component {
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

  state = {
    isMouseOver: false,
    isAdding: false,
    isReady: false,
    posterFound: true,
  }

  componentWillMount() {
    this.setState({
      layout: this.props.layout,
    })
  }

  componentWillReceiveProps(newProps) {
    const { data } = this.props
    if (data.isInCollection() !== newProps.data.isInCollection()) {
      this.setState({ isAdding: false })
    }
  }

  componentDidUpdate() {
    const { onRender } = this.props
    if (onRender) {
      onRender({
        layout: this.state.layout,
      })
    }
  }

  /**
   * Update state.mouseOver to decide if we want to generate the RegularOverlay
   * @param {boolean} isMouseOver
   */
  onMouseHover = (isMouseOver) => {
    this.setState({ isMouseOver })
  }

  onPosterLoad = (posterFound) => {
    this.setState({ posterFound, isReady: true })
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
            onMouseEnter={() => this.onMouseHover(true)}
            onMouseLeave={() => this.onMouseHover(false)}
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
        <Footer
          footer={footer}
        />
      </div>
    )
  }
}

const Footer = ({
  footer,
}) => (
  <div className={styles.Title}>
    {
      footer &&
      footer.map((line) => {
        if (line.link) {
          return (
            <Link
              key={line.key}
              to={line.link}
              target="_blank"
            >
              {line.value}
            </Link>
          )
        }
        return (
          <div key={line.key}>
            {line.value}
          </div>
        )
      })
    }
  </div>
)

Footer.propTypes = {
  footer: PropTypes.array,
}

export default Element
