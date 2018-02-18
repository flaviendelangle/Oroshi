import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import muiThemeable from 'material-ui/styles/muiThemeable'

import cx from 'classnames'

import Poster from 'components/element/Poster/index'
import ElementOverlay from 'components/element/Overlay/index'
import Details from './components/Details/index'
import { addElement, removeElement } from 'services/actions/collections/index'

import './style.css'


/** Class representing a tv-show frame, used mainly in the layouts (Grid + Stream) */
class TVShow extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    create: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    muiTheme: PropTypes.object.isRequired,
    creationMode: PropTypes.bool, // RENAME
  }

  state = {
    isMouseOver: false,
    isAdding: false,
    isExtended: false,
    isReady: false,
  }

  /**
   * Update state.mouseOver to decide if we want to generate the Overlay
   * @param {boolean} isMouseOver
   */
  handleMouseHover = (isMouseOver) => {
    this.setState({ isMouseOver })
  }

  handlePosterLoad = () => {
    this.setState({ isReady: true })
  }

  /**
   * Add the movie to the collection
   */
  save = () => {
    const { collection, data, create } = this.props
    const { isAdding } = this.state
    if (!isAdding) {
      create(collection, data)
      this.setState({ isAdding: true })
    }
  }

  /**
   * Remove the movie from the collection
   */
  destroy = () => {
    const { destroy, collection, data } = this.props
    destroy(collection, data)
  }

  /**
   * Launch the Details modal
   */
  showMore = () => {
    this.setState({ isExtended: true })
  }

  /**
   * Hide the Details modal
   */
  showLess = () => {
    this.setState({ isExtended: false })
  }

  render() {
    const {
      creationMode,
      collection,
      data,
      muiTheme: { palette },
    } = this.props
    const { isMouseOver, isExtended, isReady } = this.state
    const parentClasses = cx({
      'tv-show-parent': true,
      'already-in-collection': data.isInCollection(),
      'not-in-collection': !data.isInCollection(),
      ready: isReady,
    })
    return (
      <div className={parentClasses} >
        <div className="tv-show-container" >
          <div className="tv-show-frame">
            <Paper
              zDepth={3}
              className="tv-show"
              onMouseEnter={() => this.handleMouseHover(true)}
              onMouseLeave={() => setTimeout(() => this.handleMouseHover(false), 300)}
            >
              <Poster
                path={data.getPosterPath()}
                title={data.getTitle()}
                onLoad={this.handlePosterLoad}
              />
              <ElementOverlay
                note={this.note}
                mouseOver={isMouseOver}
                creationMode={creationMode}
                alreadyInCollection={data.isInCollection()}
                handleSave={this.save}
                handleDestroy={this.destroy}
                topRightAction={
                  <DetailsIcon
                    creationMode={creationMode}
                    handleClick={this.showMore}
                  />
                }
              />
            </Paper>
          </div>
          <Footer palette={palette} title={data.getTitle()} />
        </div>
        <DetailsFrame
          show={isExtended}
          title={data.getTitle()}
          data={data}
          onCollapse={this.showLess}
          collection={collection}
        />
      </div>
    )
  }
}

const DetailsIcon = ({ creationMode, handleClick }) => {
  if (creationMode) {
    return null
  }
  return <NavigationExpandMore onClick={handleClick} />
}

DetailsIcon.propTypes = {
  creationMode: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
}

const DetailsFrame = ({ creationMode, ...props }) => {
  if (!creationMode) {
    return (
      <Details {...props} />
    )
  }
  return null
}

DetailsFrame.propTypes = {
  creationMode: PropTypes.bool,
}

const Footer = ({ palette, title }) => (
  <div
    className="title"
    style={{ color: palette.textColor }}
  >
    <div>{title}</div>
  </div>
)

Footer.propTypes = {
  palette: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  create: (collection, element) => {
    dispatch(addElement('tv_shows', collection, element))
  },
  destroy: (collection, data) => {
    dispatch(removeElement('tv_shows', collection, data))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(TVShow))
