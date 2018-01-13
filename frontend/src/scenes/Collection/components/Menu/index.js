import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import ActionViewModule from 'material-ui/svg-icons/action/view-module';
import ActionViewStream from 'material-ui/svg-icons/action/view-stream';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { switchAddingMode } from '../../actions';
import { switchLayout } from '../CollectionContent/actions';
import { getRecommendations } from 'services/actions/publicAPI';
import SnackbarList from 'components/generics/SnackbarList';
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

class Menu extends Component {
  
  render() {
    const { isAdding, collection, scene, layout, found, loaded, isPublic, content } = this.props;
    if (!found || !loaded) {
      return null;
    }
    const theme = this.props.muiTheme.palette;
    return (
      <span>
        <AddingIcon
          collection={collection}
          switchAddingMode={this.props.switchAddingMode}
          isAdding={isAdding}
          isPublic={isPublic}
        />
        <LayoutButtons
          isAdding={isAdding}
          switchLayout={this.props.switchLayout}
          theme={theme}
          layout={layout}
          content={content}
        />
        <SnackbarList scene={scene} />
      </span>
    )
  }
  
}

const LayoutButtons = ({ isAdding, switchLayout, theme, layout, content }) => {
  if (isAdding || content.length === 0) {
    return null;
  }
  const componentContent = LAYOUTS.map((el, index) => {
    return (
      <LayoutIcon
        key={index}
        Component={el.icon}
        theme={theme}
        onClick={_ => switchLayout(el.name)}
        active={layout === el.name}
      />
    );
  });
  return (
    <div style={_style.layout}>
      {componentContent}
    </div>
  );
};

const LayoutIcon = ({ Component, theme, active, onClick }) => {
  const style = {
    color: theme.alternateTextColor,
    opacity: active ? 1 : 0.4,
    cursor: active ? 'auto' : 'pointer'
  };
  return (
    <div style={_style.layoutIcon(theme)}>
      <Component onClick={onClick} style={style} />
    </div>
  );
};

const AddingIcon = ({ isAdding, collection, switchAddingMode, isPublic }) => {
  if(isPublic) {
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
      onClick={_ => switchAddingMode(collection)}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchAddingMode: collection => {
      dispatch(switchAddingMode(ownProps.scene));
      dispatch(getRecommendations(ownProps.scene, collection));
    },
    switchLayout: layout => dispatch(switchLayout(ownProps.scene, layout))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Menu));

