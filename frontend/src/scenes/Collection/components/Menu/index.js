import React, { Fragment } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import ActionViewModule from 'material-ui/svg-icons/action/view-module';
import ActionViewStream from 'material-ui/svg-icons/action/view-stream';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { switchAddingMode } from '../../actions';
import { switchLayout } from '../CollectionContent/actions';
import { getRecommendations } from 'services/actions/publicAPI';
import SnackbarList from 'components/appStructure/SnackbarList';
import { connect } from 'services/redux';

import * as _style from './style';


const LAYOUTS = [
  {
    name: 'grid',
    icon: ActionViewModule
  }, {
    name: 'stream',
    icon: ActionViewStream
  }
];

const Menu = ({
  isAdding,
  collection,
  type,
  layout,
  found,
  loaded,
  isPublic,
  content,
  switchAddingMode,
  switchLayout,
  muiTheme: { palette },
}) => {
  if (!found || !loaded) {
    return null;
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
};

const LayoutButtons = ({
 isAdding,
 switchLayout,
 palette,
 layout,
 content
}) => {
  if (isAdding || content.length === 0) {
    return null;
  }
  const componentContent = LAYOUTS.map((el, index) => {
    return (
      <LayoutIcon
        key={index}
        Component={el.icon}
        palette={palette}
        onClick={() => switchLayout(el.name)}
        active={layout === el.name}
      />
    );
  });
  return (
    <div style={_style.layout} >
      {componentContent}
    </div>
  );
};

const LayoutIcon = ({ Component, palette, active, onClick }) => {
  const style = {
    color: palette.alternateTextColor,
    opacity: active ? 1 : 0.4,
    cursor: active ? 'auto' : 'pointer'
  };
  return (
    <div style={_style.layoutIcon(palette)} >
      <Component onClick={onClick} style={style} />
    </div>
  );
};

const AddingIcon = ({ isAdding, collection, switchAddingMode, isPublic }) => {
  if (isPublic) {
    return null;
  }
  let Icon;
  if (isAdding) {
    Icon = ActionDoneAll;
  } else {
    Icon = ContentAdd;
  }
  
  return (
    <FloatingActionButton
      style={_style.add}
      onClick={() => switchAddingMode(collection)}
    >
      <Icon/>
    </FloatingActionButton>
  );
};


const mapStateToProps = ({ content, main }) => {
  return {
    isAdding: main.isAdding,
  
    found: content.found,
    collection: content.collection,
    layout: content.layout,
    loaded: content.loaded,
    content: content.content
  }
};

const mapDispatchToProps = (dispatch, { type, collection }) => {
  return {
    switchAddingMode: collection => {
      dispatch(switchAddingMode(type, collection));
      dispatch(getRecommendations(type, collection));
    },
    switchLayout: layout => dispatch(switchLayout(type, collection, layout))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Menu));

