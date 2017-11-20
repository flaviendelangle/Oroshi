import React, {Component} from 'react';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentSort from 'material-ui/svg-icons/content/sort';

import { sort } from 'components/genericScenes/Collection/components/CollectionContent/actions';

import * as _style from './style';

class OrderMenu extends Component {
  
  sort = (...args) => {
    this.props.sort.bind(this, this.props.scene)(...args);
  };
  
  render() {
    return (
      <div style={_style.container}>
        <Menu {...this.props} sort={this.sort} />
      </div>
    );
  }
}

const Menu = ({ isAdding, layout, scene, sort }) => {
  if(isAdding) {
    return null;
  }
  else if(layout === 'stream') {
    switch(scene) {
      case 'movies':
        return <StreamMenuMovies sort={sort} />;
      case 'tv_shows':
        return <StreamMenuTVShows sort={sort} />;
      default:
        return null;
    }
  }
  else {
    switch(scene) {
      case 'movies':
        return <DefaultMenuMovies sort={sort} />;
      case 'tv_shows':
        return <DefaultMenuTVShows sort={sort} />;
      default:
        return null;
    }
  }
};

const StreamMenuMovies = ({ sort }) => (
  <IconMenu
    iconButtonElement={<IconButton><ContentSort /></IconButton>}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
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
      onClick={() => sort('stream', 'release')}
    />
  </IconMenu>
);

const StreamMenuTVShows = ({ sort }) => (
  <IconMenu
    iconButtonElement={<IconButton><ContentSort /></IconButton>}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
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
);

const DefaultMenuMovies = ({ sort }) => (
  <IconMenu
    iconButtonElement={<IconButton><ContentSort /></IconButton>}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem
      primaryText="Order by title"
      onClick={() => sort('default', 'title', 'asc')}
    />
    <MenuItem
      primaryText="Order by note"
      onClick={() => sort('default', 'note', 'desc')}
    />
    <MenuItem
      primaryText="Order by year of release"
      onClick={() => sort('default', 'release', 'desc')}
    />
  </IconMenu>
);

const DefaultMenuTVShows = ({ sort }) => (
  <IconMenu
    iconButtonElement={<IconButton><ContentSort /></IconButton>}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem
      primaryText="Order by title"
      onClick={() => sort('default', 'title', 'asc')}
    />
    <MenuItem
      primaryText="Order by note"
      onClick={() => sort('default', 'note', 'desc')}
    />
  </IconMenu>
);

const mapStateToProps = (state, ownProps) => {
  const root = state.collections.main[ownProps.scene];
  const contentRoot = state.collections.content[ownProps.scene];
  if(!root) {
    return {
    }
  }
  return {
    layout: contentRoot.layout,
    isAdding: root.isAdding
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sort: (...args) => dispatch(sort(ownProps.scene, ...args))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderMenu);