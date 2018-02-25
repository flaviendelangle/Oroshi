import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionDoneAll from 'material-ui/svg-icons/action/done-all'
import ActionViewModule from 'material-ui/svg-icons/action/view-module'
import ActionViewStream from 'material-ui/svg-icons/action/view-stream'

import { switchLayout as _switchLayout } from '../CollectionContent/actions'
import SnackbarList from '../../../components/appStructure/SnackbarList/index'

import { switchAddingMode as _switchAddingMode } from '../actions'
import { getRecommendations } from '../../../services/actions/publicAPI/index'
import { connect } from '../../../services/redux'

import styles from './Menu.scss'


const LAYOUTS = [
  {
    name: 'grid',
    icon: ActionViewModule,
  },
  {
    name: 'stream',
    icon: ActionViewStream,
  },
]

const Menu = ({
  isAdding,
  collection,
  type,
  layout,
  found,
  isLoaded,
  isPublic,
  content,
  switchAddingMode,
  switchLayout,
}) => {
  if (
    !found ||
    !isLoaded
  ) {
    return null
  }
  return (
    <Fragment>
      <AddingIcon
        collection={collection}
        switchAddingMode={switchAddingMode}
        isAdding={isAdding}
        isPublic={isPublic}
      />
      <LayoutButtons
        isAdding={isAdding}
        switchLayout={switchLayout}
        layout={layout}
        content={content}
      />
      <SnackbarList
        type={type}
        collection={collection}
      />
    </Fragment>
  )
}

Menu.propTypes = {
  isAdding: PropTypes.bool,
  collection: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isPublic: PropTypes.bool,
  switchAddingMode: PropTypes.func.isRequired,
  switchLayout: PropTypes.func.isRequired,
  layout: PropTypes.string,
  found: PropTypes.bool,
  content: PropTypes.array,

}

const LayoutButtons = ({
  isAdding,
  switchLayout,
  layout,
  content,
}) => {
  if (
    isAdding ||
    content.length === 0
  ) {
    return null
  }
  return (
    <div className={styles.Layout} >
      {
        LAYOUTS.map(el => (
          <LayoutIcon
            key={el.name}
            Component={el.icon}
            onClick={() => switchLayout(el.name)}
            active={layout === el.name}
          />
        ))
      }
    </div>
  )
}

LayoutButtons.propTypes = {
  isAdding: PropTypes.bool,
  layout: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  switchLayout: PropTypes.func.isRequired,
}

const LayoutIcon = ({
  Component,
  active,
  onClick,
}) => {
  const iconClasses = cx({
    [styles.LayoutIcon]: true,
    [styles.LayoutIconActive]: active,
  })
  return (
    <div className={iconClasses} >
      <Component onClick={onClick} />
    </div>
  )
}

LayoutIcon.propTypes = {
  Component: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

const AddingIcon = ({
  isAdding,
  collection,
  switchAddingMode,
  isPublic,
}) => {
  if (isPublic) {
    return null
  }
  let Icon
  if (isAdding) {
    Icon = ActionDoneAll
  } else {
    Icon = ContentAdd
  }

  return (
    <FloatingActionButton
      className={styles.AddingIcon}
      onClick={() => switchAddingMode(collection)}
    >
      <Icon />
    </FloatingActionButton>
  )
}

AddingIcon.propTypes = {
  collection: PropTypes.object.isRequired,
  switchAddingMode: PropTypes.func.isRequired,
  isPublic: PropTypes.bool,
  isAdding: PropTypes.bool,
}

const mapStateToProps = ({ content, main }) => ({
  isAdding: main.isAdding,
  isLoaded: main.isLoaded,
  found: main.found,
  collection: main.collection,

  layout: content.layout,
  content: content.content,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  switchAddingMode: () => {
    dispatch(_switchAddingMode(type, collection))
    dispatch(getRecommendations(type, collection))
  },
  switchLayout: layout => dispatch(_switchLayout(type, collection, layout)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu)

