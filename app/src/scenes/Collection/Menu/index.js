import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionDoneAll from 'material-ui/svg-icons/action/done-all'
import ActionViewModule from 'material-ui/svg-icons/action/view-module'
import ActionViewStream from 'material-ui/svg-icons/action/view-stream'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { switchLayout as _switchLayout } from '../CollectionContent/actions'
import SnackbarList from '../../../components/appStructure/SnackbarList/index'

import { switchAddingMode as _switchAddingMode } from '../actions'
import { getRecommendations } from '../../../services/actions/publicAPI/index'
import { connect } from '../../../services/redux'

import * as _style from './style'


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
  muiTheme: { palette },
}) => {
  if (!found || !isLoaded) {
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
        palette={palette}
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
  muiTheme: PropTypes.object.isRequired,
  layout: PropTypes.string,
  found: PropTypes.bool,
  content: PropTypes.array,

}

const LayoutButtons = ({
  isAdding,
  switchLayout,
  palette,
  layout,
  content,
}) => {
  if (isAdding || content.length === 0) {
    return null
  }
  const componentContent = LAYOUTS.map(el => (
    <LayoutIcon
      key={el.name}
      Component={el.icon}
      palette={palette}
      onClick={() => switchLayout(el.name)}
      active={layout === el.name}
    />
  ))
  return (
    <div style={_style.layout} >
      {componentContent}
    </div>
  )
}

LayoutButtons.propTypes = {
  isAdding: PropTypes.bool,
  layout: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  switchLayout: PropTypes.func.isRequired,
  palette: PropTypes.object.isRequired,
}

const LayoutIcon = ({
  Component,
  palette,
  active,
  onClick,
}) => {
  const style = {
    color: palette.alternateTextColor,
    opacity: active ? 1 : 0.4,
    cursor: active ? 'auto' : 'pointer',
  }
  return (
    <div style={_style.layoutIcon(palette)} >
      <Component onClick={onClick} style={style} />
    </div>
  )
}

LayoutIcon.propTypes = {
  Component: PropTypes.func.isRequired,
  palette: PropTypes.object.isRequired,
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
      style={_style.add}
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
)(muiThemeable()(Menu))

