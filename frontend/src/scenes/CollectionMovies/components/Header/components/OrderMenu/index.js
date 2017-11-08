import React, {Component} from 'react'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentSort from 'material-ui/svg-icons/content/sort'

import { sort } from 'components/CollectionContent/actions'

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
    this.props.sort.bind(this, this.props.type)(...args);
  };
  
  renderStreamMenu = () => {
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
  
  renderDefaultMenu = () => {
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
  
  render() {
    return (
      <div style={containerStyle}>
        {this.renderMenu()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.collectionMovies.moviesData.layout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sort: (...args) => dispatch(sort(...args))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);