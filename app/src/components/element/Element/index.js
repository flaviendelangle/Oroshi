import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import muiThemeable from 'material-ui/styles/muiThemeable'

import cx from 'classnames'

import Poster from '../Poster'
import RegularOverlay from '../RegularOverlay'
import ClickableOverlay from '../ClickableOverlay'
import Suggestions from './Suggestions'

import styles from './Element.scss'


const OVERLAYS = {
  regular: RegularOverlay,
  clickable: ClickableOverlay,
}

class Element extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    creationMode: PropTypes.bool, // RENAME
    layout: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
    onRender: PropTypes.func,
    mode: PropTypes.string,
    style: PropTypes.object,
    isPublic: PropTypes.bool,
    footer: PropTypes.array,
    switchSeen: PropTypes.func,
    overlay: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    overlay: 'regular',
  }

  state = {
    isMouseOver: false,
    isAdding: false,
    isReady: false,
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

  onPosterLoad = () => {
    this.setState({ isReady: true })
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
        <span ref={el => this.addToLayout(action, el)} >
          <ActionComponent {...this.props} />
        </span>
      )
    }
    return (
      <span ref={el => this.addToLayout(this.props[`${actionName}Key`], el)} >
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

  getOverlay = () => OVERLAYS[this.props.overlay]

  getTopRightAction = () => this.getAction('topRightAction')

  getTopLeftAction = () => this.getAction('topLeftAction')

  /**
   * Check if we are in test mode
   */
  isTesting = () => this.props.mode === 'test'

  addToLayout = (/* key, element */) => {
    /*
    const { layout } = this.state
    this.setState(() => ({
      layout: {
        ...layout,
        [key]: {
          ...layout[key],
          element
        }
      },
    }))
    */
  }

  /**
   * Switch the seen parameter of the movie
   */
  switchSeen = () => {
    const { data, switchSeen } = this.props
    if (this.isTesting()) {
      return null
    }
    return switchSeen(data)
  }

  render() {
    const {
      style,
      creationMode,
      isPublic,
      mode,
      data,
      footer,
      onClick,
      muiTheme: { palette },
    } = this.props
    const { isMouseOver, isReady } = this.state
    const elementClasses = cx({
      [styles.Element]: true,
      [styles.ElementInCollection]: (data.isInCollection() && creationMode),
      [styles.ElementNotInCollection]: (!data.isInCollection() && creationMode),
      [styles.ElementReady]: isReady,
    })

    const Overlay = this.getOverlay()

    return (
      <div className={elementClasses} style={style} >
        <div className={styles.Container}>
          <Paper
            zDepth={3}
            className={styles.Content}
            onMouseEnter={() => this.onMouseHover(true)}
            onMouseLeave={() => this.onMouseHover(false)}
          >
            <Poster
              path={data.getPosterPath()}
              title={data.getTitle()}
              onLoad={this.onPosterLoad}
            />
            <Overlay
              mode={mode}
              addToLayout={this.addToLayout}
              note={data.getNote()}
              mouseOver={isMouseOver}
              creationMode={creationMode}
              alreadyInCollection={data.isInCollection()}
              onSave={this.onSave}
              onDestroy={this.onDestroy}
              isPublic={isPublic}
              topRightAction={this.getTopRightAction()}
              topLeftAction={this.getTopLeftAction()}
              onClick={onClick}
              data={data}
            />
          </Paper>
        </div>
        <Footer
          palette={palette}
          footer={footer}
          addToLayout={this.addToLayout}
        />
      </div>
    )
  }
}

const Footer = ({
  palette,
  footer,
  addToLayout,
}) => (
  <div
    className={styles.Title}
    style={{ color: palette.textColor }}
  >
    {
      footer &&
      footer.map((line) => {
        if (line.link) {
          return (
            <Link
              key={line.key}
              to={line.link}
              target="_blank"
              ref={el => addToLayout(line.key, el)}
            >
              {line.value}
            </Link>
          )
        }
        return (
          <div ref={el => addToLayout(line.key, el)} key={1} >
            {line.value}
          </div>
        )
      })
    }
  </div>
)

Footer.propTypes = {
  palette: PropTypes.object.isRequired,
  addToLayout: PropTypes.func.isRequired,
  footer: PropTypes.array,
}

export default muiThemeable()(Element)
