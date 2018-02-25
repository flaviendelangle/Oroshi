import React from 'react'
import PropTypes from 'prop-types'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ContentSort from 'material-ui/svg-icons/content/sort'

import { sort as _sort } from '../../../../scenes/Collection/CollectionContent/actions'
import { connect } from '../../../../services/redux'

import styles from './OrderMenu.scss'


const LINKS = {
  movies: {
    stream: [
      { label: 'Group by directors', arguments: ['directors'] },
      { label: 'Group by genres', arguments: ['genres'] },
      { label: 'Group by year of release', arguments: ['release_year'] },
    ],
    grid: [
      { label: 'Order by title', arguments: ['title', 'asc'] },
      { label: 'Order by note', arguments: ['note', 'desc'] },
      { label: 'Order by release date', arguments: ['release', 'desc'] },
    ],
  },
  tv_shows: {
    stream: [
      { label: 'Group by networks', arguments: ['networks'] },
      { label: 'Group by genres', arguments: ['genres'] },
    ],
    grid: [
      { label: 'Order by title', arguments: ['title', 'asc'] },
      { label: 'Order by note', arguments: ['note', 'desc'] },
    ],
  },
}


const OrderMenu = ({
  type,
  layout,
  sort,
  isAdding,
}) => (
  <div className={styles.OrderMenu} >
    {
      layout &&
      !isAdding &&
      <IconMenu
        iconButtonElement={<IconButton><ContentSort /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        className={styles.Icon}
      >
        {
          LINKS[type][layout].map(el => (
            <MenuItem
              primaryText={el.label}
              onClick={() => sort(layout, ...el.arguments)}
              key={el.label}
            />
          ))
        }
      </IconMenu>
    }
  </div>
)

OrderMenu.propTypes = {
  sort: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  isAdding: PropTypes.bool,
  layout: PropTypes.string,
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
)(OrderMenu)
