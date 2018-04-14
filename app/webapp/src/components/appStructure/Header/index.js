import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import BackSpace from 'material-ui/svg-icons/hardware/keyboard-backspace'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

import MainDrawer from './MainDrawer'
import Search from './Search'
import OrderMenu from './OrderMenu'

import { showMainDrawer } from '../../../services/actions/interface'
import { connect } from '../../../services/redux'

import styles from './Header.scss'


class Header extends PureComponent {
  static propTypes = {
    scene: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    openMainDrawer: PropTypes.func.isRequired,
    autoComplete: PropTypes.object,
    layout: PropTypes.string,
    query: PropTypes.string,
    isDrawerOpen: PropTypes.bool,
    isPublic: PropTypes.bool,
    isAdding: PropTypes.bool,
    count: PropTypes.number,
  }

  onButtonClick = () => {
    const { scene, openMainDrawer } = this.props
    if (['content', 'settings', 'search'].includes(scene)) {
      openMainDrawer(true)
    }
  }

  getAutoComplete() {
    const { isAdding, layout, autoComplete } = this.props
    if (
      isAdding ||
      !autoComplete
    ) {
      return []
    }
    if (layout === 'stream') {
      return autoComplete.stream
    }
    return autoComplete.grid
  }

  getTitle() {
    const { scene, collection } = this.props
    if (
      !collection ||
      !collection.title
    ) {
      return ''
    }
    if (scene === 'suggestions') {
      return `Go back to "${collection.title}"`
    }
    return collection.title
  }

  render() {
    const {
      isDrawerOpen,
      isPublic,
      isAdding,
      count,
      collection,
      type,
      query,
      scene,
      openMainDrawer,
    } = this.props

    const headerClasses = cx({
      [styles.Header]: true,
      [styles.HeaderWithSearch]: (scene === 'content'),
    })

    return (
      <header className={headerClasses}>
        <AppBar
          iconElementLeft={
            <Icon
              className={styles.Icon}
              scene={scene}
              link={`/collections/${type}/${collection.pk}/`}
              onClick={this.onButtonClick}
            />
          }
          title={this.getTitle()}
          onLeftIconButtonClick={this.onButtonClick}
          showMenuIconButton={!isPublic}
        >
          {
            (scene === 'content') &&
            <Fragment>
              <Search
                key={1}
                title={this.getTitle()}
                type={type}
                query={query}
                count={count}
                isAdding={isAdding}
                collection={collection}
                autoComplete={this.getAutoComplete()}
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
          ['content', 'settings', 'search'].includes(scene) &&
          <MainDrawer
            title={this.getTitle()}
            isPublic={isPublic}
            isOpen={isDrawerOpen}
            onOpen={openMainDrawer}
            scene={scene}
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
  link,
  ...props
}) => {
  if (scene === 'suggestions') {
    return (
      <Link to={link} >
        <IconButton tooltip="Return to collection" {...props}>
          <BackSpace />
        </IconButton>
      </Link>

    )
  }
  return (
    <IconButton {...props}>
      <NavigationMenu />
    </IconButton>
  )
}

Icon.propTypes = {
  scene: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

const mapStateToProps = ({ header, content, main }) => {
  const count = content[content.layout].getElementCount()
  return {
    isDrawerOpen: header.isDrawerOpen,
    layout: content.layout,
    autoComplete: content.autoComplete,

    title: header.title,
    query: header.query,

    collection: main.collection,
    found: main.found,
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
)(Header)
