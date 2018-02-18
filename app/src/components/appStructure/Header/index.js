import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import BackSpace from 'material-ui/svg-icons/hardware/keyboard-backspace'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import muiThemeable from 'material-ui/styles/muiThemeable'

import MainDrawer from './components/MainDrawer'
import Search from './components/Search'
import OrderMenu from './components/OrderMenu'
import { showMainDrawer } from './components/MainDrawer/actions'
import { connect } from 'services/redux'

class Header extends Component {
  static propTypes = {
    scene: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
    openMainDrawer: PropTypes.func.isRequired,
    autoComplete: PropTypes.object,
    title: PropTypes.string,
    layout: PropTypes.string,
    query: PropTypes.string,
    showTitle: PropTypes.bool,
    isDrawerOpen: PropTypes.bool,
    isPublic: PropTypes.bool,
    isAdding: PropTypes.bool,
    count: PropTypes.number,
  }

  onButtonClick = () => {
    const { scene, openMainDrawer } = this.props
    if (scene === 'content' || scene === 'settings') {
      openMainDrawer(true)
    }
  }

  get autoComplete() {
    const { isAdding, layout, autoComplete } = this.props
    if (isAdding || !autoComplete) {
      return []
    }
    if (layout === 'stream') {
      return autoComplete.stream
    }
    return autoComplete.grid
  }

  render() {
    const {
      isDrawerOpen,
      isPublic,
      isAdding,
      title,
      showTitle,
      count,
      collection,
      type,
      query,
      scene,
      openMainDrawer,
      muiTheme: { palette },
    } = this.props
    return (
      <header>
        <AppBar
          iconElementLeft={
            <Icon
              palette={palette}
              scene={scene}
              link={`/collections/${type}/${collection.pk}/`}
              onClick={this.onButtonClick}
            />
          }
          title={ showTitle ? title : ''}
          onLeftIconButtonClick={this.onButtonClick}
          showMenuIconButton={!isPublic}
        >
          {
            (scene === 'content') &&
            <Fragment>
              <Search
                key={1}
                title={title}
                type={type}
                query={query}
                count={count}
                isAdding={isAdding}
                collection={collection}
                autoComplete={this.autoComplete}
              />
              <OrderMenu
                key={2}
                type={type}
                collection={collection}
              />
            </Fragment>
          }
        </AppBar>
        {
          (scene === 'content' || scene === 'settings') &&
          <MainDrawer
            title={title}
            isPublic={isPublic}
            isOpen={isDrawerOpen}
            onOpen={openMainDrawer}
            scene={scene}
            palette={palette}
            collection={collection}
            type={type}
          />
        }
      </header>
    )

  }

}

const Icon = ({
  scene,
  palette,
  link,
  ...props
}) => {
  if (scene === 'suggestions'){
    return (
      <Link to={link} >
        <IconButton
          tooltip="Return to collection"
          iconStyle={{ color: palette.alternateTextColor }}
        >
          <BackSpace />
        </IconButton>
      </Link>

    )
  }
  return (
    <IconButton
      iconStyle={{ color: palette.alternateTextColor }}
      {...props}
    >
      <NavigationMenu />
    </IconButton>
  )
}

Icon.propTypes = {
  scene: PropTypes.string.isRequired,
  palette: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
}

const mapStateToProps = ({ header, content, main }) => {
  let count
  if (content.layout === 'stream') {
    count = content.stream.getElementCount()
  } else {
    count = content.grid.getElementCount()
  }
  return {
    isDrawerOpen: header.isDrawerOpen,
    found: content.found,
    layout: content.layout,
    collection: content.collection,
    autoComplete: content.autoComplete,

    title: header.title,
    query: header.query,

    isAdding: main.isAdding,

    count,
  }
}

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  openMainDrawer: show => dispatch(showMainDrawer(type, collection, show)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(Header))
