import React, {Component} from 'react';
import { connect } from 'react-redux';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentSort from 'material-ui/svg-icons/content/sort';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { sort } from 'scenes/Collection/components/CollectionContent/actions';

import * as _style from './style';


class OrderMenu extends Component {
  
  sort = (...args) => {
    this.props.sort.bind(this, this.props.scene)(...args);
  };
  
  render() {
    return (
      <div style={_style.container}>
        <Menu
          {...this.props}
          sort={this.sort}
          color={this.props.muiTheme.palette.alternateTextColor}
        />
      </div>
    );
  }
}

const Menu = ({ isAdding, layout, scene, sort, color }) => {
  if (isAdding) {
    return null;
  }
  else if (layout === 'stream') {
    switch(scene) {
      case 'movies':
        return <StreamMenuMovies sort={sort} color={color} />;
      case 'tv_shows':
        return <StreamMenuTVShows sort={sort} color={color} />;
      default:
        return null;
    }
  }
  else {
    switch(scene) {
      case 'movies':
        return <DefaultMenuMovies sort={sort} color={color} />;
      case 'tv_shows':
        return <DefaultMenuTVShows sort={sort} color={color} />;
      default:
        return null;
    }
  }
};

const StreamMenuMovies = ({ sort, color }) => (
  <IconMenu
    iconButtonElement={<IconButton iconStyle={{color}}><ContentSort /></IconButton>}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem
      primaryText="Group by directors"
      onClick={_ => sort('stream', 'directors')}
    />
    <MenuItem
      primaryText="Group by genres"
      onClick={_ => sort('stream', 'genres')}
    />
    <MenuItem
      primaryText="Group by year of release"
      onClick={_ => sort('stream', 'release_year')}
    />
  </IconMenu>
);

const StreamMenuTVShows = ({ sort, color }) => (
  <IconMenu
    iconButtonElement={<IconButton iconStyle={{color}}><ContentSort /></IconButton>}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem
      primaryText="Group by networks"
      onClick={_ => sort('stream', 'networks')}
    />
    <MenuItem
      primaryText="Group by genres"
      onClick={_ => sort('stream', 'genres')}
    />
  </IconMenu>
);

const DefaultMenuMovies = ({ sort, color }) => (
  <IconMenu
    iconButtonElement={<IconButton iconStyle={{color}}><ContentSort /></IconButton>}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem
      primaryText="Order by title"
      onClick={_ => sort('default', 'title', 'asc')}
    />
    <MenuItem
      primaryText="Order by note"
      onClick={_ => sort('default', 'note', 'desc')}
    />
    <MenuItem
      primaryText="Order by release date"
      onClick={_ => sort('default', 'release', 'desc')}
    />
  </IconMenu>
);

const DefaultMenuTVShows = ({ sort, color }) => (
  <IconMenu
    iconButtonElement={<IconButton iconStyle={{color}}><ContentSort /></IconButton>}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem
      primaryText="Order by title"
      onClick={_ => sort('default', 'title', 'asc')}
    />
    <MenuItem
      primaryText="Order by note"
      onClick={_ => sort('default', 'note', 'desc')}
    />
  </IconMenu>
);

const mapStateToProps = (state, ownProps) => {
  const root = state.collections.main[ownProps.scene];
  const contentRoot = state.collections.content[ownProps.scene];
  if (!root) {
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
)(muiThemeable()(OrderMenu));