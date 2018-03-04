import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import ActionHome from 'material-ui/svg-icons/action/home'
import ActionExit from 'material-ui/svg-icons/action/exit-to-app'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionAccountBox from 'material-ui/svg-icons/action/account-box'

import { showMainDrawer } from './actions'
import { connect } from '../../../../services/redux'
import typeManager from '../../../../services/content/type'

import styles from './MainDrawer.scss'


const APP_LINES = [
  <Link to="/">
    <ActionHome />
    <div>Home</div>
  </Link>,
]

const ACCOUNT_LINES = [
  <Link to="/account/">
    <ActionAccountBox />
    <div>Account</div>
  </Link>,
  <Link to="/logout/">
    <ActionExit />
    <div>Logout</div>
  </Link>,
]

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

  getCollectionLines() {
    const {
      scene,
      type,
      collection,
    } = this.props

    const CollectionIcon = typeManager.read(type).icon()

    const lines = {
      content: (
        <Link to={`/collections/${type}/${collection.pk}/`} key={1} >
          <CollectionIcon />
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

  getLines = () => [
    APP_LINES,
    this.getCollectionLines(),
    ACCOUNT_LINES,
  ]

  render() {
    const {
      isPublic,
      isOpen,
      title,
      onOpen,
    } = this.props

    const lines = this.getLines()

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
            {
              lines.map((section, index) => (
                <div
                  className={styles.Section}
                  key={index /* eslint-disable-line react/no-array-index-key */}
                >
                  { section.map(line => (
                    <MenuItem key={line.props.to}>
                      {line}
                    </MenuItem>
                  ))}
                  { (index < lines.length - 1) && <Divider /> }
                </div>
              ))
            }
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
