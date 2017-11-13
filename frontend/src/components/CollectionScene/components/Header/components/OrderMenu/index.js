import React, {Component} from 'react';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentSort from 'material-ui/svg-icons/content/sort';

import { getCollectionState } from 'containers/reducer';
import { sort } from 'components/CollectionScene/components/CollectionContent/actions'

const containerStyle = {
  position: 'absolute',
  width: 24,
  height: 24,
  right: 20,
  top: 8
};

class Search extends Component {
  
  renderMenu = () => {
    if(this.props.layout === 'stream') {
      return this.renderStreamMenu();
    } else {
      return this.renderDefaultMenu();
    }
  };
  
  sort = (...args) => {
    this.props.sort.bind(this, this.props.scene)(...args);
  };
  
  renderStreamMenu = () => {
    switch(this.props.scene) {
      case 'movies':
        return this.renderStreamMenuMovies();
      case 'tv_shows':
        return this.renderStreamMenuTVShows();
      
    }
  };
  
  renderStreamMenuMovies = () => {
    return (
      <IconMenu
        iconButtonElement={<IconButton><ContentSort /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Group by directors"
          onClick={() => this.sort('stream', 'directors')}
        />
        <MenuItem
          primaryText="Group by genres"
          onClick={() => this.sort('stream', 'genres')}
        />
        <MenuItem
          primaryText="Group by year of release"
          onClick={() => this.sort('stream', 'release')}
        />
      </IconMenu>
    );
  };
  
  renderStreamMenuTVShows = () => {
    return (
      <IconMenu
        iconButtonElement={<IconButton><ContentSort /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Group by networks"
          onClick={() => this.sort('stream', 'networks')}
        />
        <MenuItem
          primaryText="Group by genres"
          onClick={() => this.sort('stream', 'genres')}
        />
      </IconMenu>
    );
  };
  
  renderDefaultMenu = () => {
    switch(this.props.scene) {
      case 'movies':
        return this.renderDefaultMenuMovies();
      case 'tv_shows':
        return this.renderDefaultMenuTVShows();
    }
  };
  
  renderDefaultMenuMovies = () => {
    return (
      <IconMenu
        iconButtonElement={<IconButton><ContentSort /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Order by title"
          onClick={() => this.sort('default', 'title', 'asc')}
        />
        <MenuItem
          primaryText="Order by note"
          onClick={() => this.sort('default', 'note', 'desc')}
        />
        <MenuItem
          primaryText="Order by year of release"
          onClick={() => this.sort('default', 'release', 'desc')}
        />
      </IconMenu>
    )
  };
  
  renderDefaultMenuTVShows = () => {
    return (
      <IconMenu
        iconButtonElement={<IconButton><ContentSort /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Order by title"
          onClick={() => this.sort('default', 'title', 'asc')}
        />
        <MenuItem
          primaryText="Order by note"
          onClick={() => this.sort('default', 'note', 'desc')}
        />
      </IconMenu>
    )
  };
  
  render() {
    return (
      <div style={containerStyle}>
        {this.renderMenu()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    layout: getCollectionState(state, ownProps.scene).main.layout
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
)(Search);