import React from 'react'
import PropTypes from 'prop-types'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ContentSort from 'material-ui/svg-icons/content/sort'

import { sortCollectionContent } from '../../../../services/actions/interface'
import { connect } from '../../../../services/redux'
import tM from '../../../../services/content/type'

import styles from './OrderMenu.scss'


const STYLE = { horizontal: 'right', vertical: 'top' }

const OrderMenu = ({
  type,
  layout,
  sort,
  isAdding,
}) => (
  <div className={styles.OrderMenu}>
    {
      layout &&
      !isAdding &&
      <IconMenu
        iconButtonElement={<IconButton><ContentSort /></IconButton>}
        anchorOrigin={STYLE}
        targetOrigin={STYLE}
        className={styles.Icon}
      >
        {
          tM.read(type).sort_options().content[layout].map(el => (
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
  sort: (...args) => dispatch(sortCollectionContent(type, collection, ...args)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderMenu)
