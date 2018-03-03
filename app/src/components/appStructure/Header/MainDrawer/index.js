import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import ActionHome from 'material-ui/svg-icons/action/home'
import ActionExit from 'material-ui/svg-icons/action/exit-to-app'
import AVMovie from 'material-ui/svg-icons/av/movie'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionSearch from 'material-ui/svg-icons/action/search'

import { showMainDrawer } from './actions'
import { connect } from '../../../../services/redux'

import styles from './MainDrawer.scss'


class MainDrawer extends Component {
  static propTypes = {
    scene: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired,
    isPublic: PropTypes.bool,
    isOpen: PropTypes.bool,
    title: PropTypes.string,

  }

  getSceneLines() {
    const {
      scene,
      type,
      collection,
    } = this.props

    const lines = {
      content: (
        <Link to={`/collections/${type}/${collection.pk}/`} key={1} >
          <AVMovie />
          <div>Return to my collection</div>
        </Link>
      ),
      search: (
        <Link to={`/collections/${type}/${collection.pk}/search/`} key={1} >
          <ActionSearch />
          <div>Advanced Search</div>
        </Link>
      ),
      settings: (
        <Link to={`/collections/${type}/${collection.pk}/settings/`} key={2} >
          <ActionSettings />
          <div>Collection Settings</div>
        </Link>
      ),
    }
    return Object.keys(lines).filter(el => el !== scene).map(el => lines[el])
  }

  GENERIC_LINES_BEFORE = [
    (
      <Link to="/">
        <ActionHome />
        <div>Home</div>
      </Link>
    ),
  ]

  GENERIC_LINES_AFTER = [
    (
      <Link to="/logout/">
        <ActionExit />
        <div>Logout</div>
      </Link>
    ),
  ]

  renderLines = () => {
    const lines = [
      ...this.GENERIC_LINES_BEFORE,
      ...this.getSceneLines(),
      <Divider key={-1} />,
      ...this.GENERIC_LINES_AFTER,
    ]
    return lines.map((el) => {
      if (el.type.name === 'Divider') {
        return el
      }
      return (
        <MenuItem key={el.props.to} >
          {el}
        </MenuItem>
      )
    })
  }

  render() {
    const {
      isPublic,
      isOpen,
      title,
      onOpen,
    } = this.props

    if (isPublic) {
      return null
    }
    return (
      <nav className={styles.MainDrawer}>
        <Drawer
          open={isOpen}
          docked={false}
          onRequestChange={onOpen}
        >
          <AppBar
            title={title}
            onLeftIconButtonClick={() => onOpen(false)}
            className={styles.TitleBar}
          >
            {this.searchBar}
            {this.actionsButton}
          </AppBar>
          <div className={styles.Content}>
            {this.renderLines()}
          </div>
        </Drawer>
      </nav>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  open: show => dispatch(showMainDrawer(show)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainDrawer)
