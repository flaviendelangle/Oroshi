import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    if (!found || !loaded || content.length === 0) {
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
        />
        <SnackbarList scene={scene} />
      </span>
    )
  }
  
}

const LayoutButtons = ({ isAdding, switchLayout, theme, layout }) => {
  if (isAdding) {
    return null;
  }
  const content = LAYOUTS.map((el, index) => {
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
      {content}
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


const mapStateToProps = (state, ownProps) => {
  const root = state.collections.main[ownProps.scene];
  const contentRoot = state.collections.content[ownProps.scene];
  if (!root || !contentRoot) {
    return {
      loaded: false
    };
  }
  return {
    isAdding: root.isAdding,
  
    found: contentRoot.found,
    collection: contentRoot.collection,
    layout: contentRoot.layout,
    loaded: contentRoot.loaded,
    content: contentRoot.content
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

