import React from 'react'
import PropTypes from 'prop-types'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ContentSort from 'material-ui/svg-icons/content/sort'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { sort as _sort } from '../../../../scenes/Collection/CollectionContent/actions'
import { connect } from '../../../../services/redux'

import styles from './OrderMenu.scss'


const OrderMenu = ({ muiTheme: { palette }, ...props }) => (
  <div style={styles.OrderMenu} >
    <Menu
      {...props}
      color={palette.alternateTextColor}
    />
  </div>
)

OrderMenu.propTypes = {
  sort: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
}

const Menu = ({
  isAdding,
  layout,
  type,
  sort,
  color,
}) => {
  if (isAdding) {
    return null
  } else if (layout === 'stream') {
    switch (type) {
      case 'movies':
        return <StreamMenuMovies sort={sort} color={color} />
      case 'tv_shows':
        return <StreamMenuTVShows sort={sort} color={color} />
      default:
        return null
    }
  } else {
    switch (type) {
      case 'movies':
        return <DefaultMenuMovies sort={sort} color={color} />
      case 'tv_shows':
        return <DefaultMenuTVShows sort={sort} color={color} />
      default:
        return null
    }
  }
}

Menu.propTypes = {
  type: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  isAdding: PropTypes.bool,
  layout: PropTypes.string,
}

const StreamMenuMovies = ({ sort, color }) => (
  <IconMenu
    iconButtonElement={<IconButton iconStyle={{ color }} ><ContentSort /></IconButton>}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem
      primaryText="Group by directors"
      onClick={() => sort('stream', 'directors')}
    />
    <MenuItem
      primaryText="Group by genres"
      onClick={() => sort('stream', 'genres')}
    />
    <MenuItem
      primaryText="Group by year of release"
      onClick={() => sort('stream', 'release_year')}
    />
  </IconMenu>
)

StreamMenuMovies.propTypes = {
  sort: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
}

const StreamMenuTVShows = ({ sort, color }) => (
  <IconMenu
    iconButtonElement={<IconButton iconStyle={{ color }} ><ContentSort /></IconButton>}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem
      primaryText="Group by networks"
      onClick={() => sort('stream', 'networks')}
    />
    <MenuItem
      primaryText="Group by genres"
      onClick={() => sort('stream', 'genres')}
    />
  </IconMenu>
)

StreamMenuTVShows.propTypes = {
  sort: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
}

const DefaultMenuMovies = ({ sort, color }) => (
  <IconMenu
    iconButtonElement={<IconButton iconStyle={{ color }} ><ContentSort /></IconButton>}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem
      primaryText="Order by title"
      onClick={() => sort('grid', 'title', 'asc')}
    />
    <MenuItem
      primaryText="Order by note"
      onClick={() => sort('grid', 'note', 'desc')}
    />
    <MenuItem
      primaryText="Order by release date"
      onClick={() => sort('grid', 'release', 'desc')}
    />
  </IconMenu>
)

DefaultMenuMovies.propTypes = {
  sort: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
}

const DefaultMenuTVShows = ({ sort, color }) => (
  <IconMenu
    iconButtonElement={<IconButton iconStyle={{ color }} ><ContentSort /></IconButton>}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem
      primaryText="Order by title"
      onClick={() => sort('grid', 'title', 'asc')}
    />
    <MenuItem
      primaryText="Order by note"
      onClick={() => sort('grid', 'note', 'desc')}
    />
  </IconMenu>
)

DefaultMenuTVShows.propTypes = {
  sort: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
}

const mapStateToProps = ({ main, content }) => ({
  layout: content.layout,
  isAdding: main.isAdding,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  sort: (...args) => dispatch(_sort(type, collection, ...args)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(OrderMenu))
