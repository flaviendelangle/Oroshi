import React, {Component} from 'react'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentSort from 'material-ui/svg-icons/content/sort'

import { updateOrder } from './actions'

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
  
  renderStreamMenu = () => {
    return (
      <IconMenu
        iconButtonElement={<IconButton><ContentSort /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Group by directors"
          onClick={() => this.props.updateOrder('stream', 'directors')}
        />
        <MenuItem
          primaryText="Group by genres"
          onClick={() => this.props.updateOrder('stream', 'genres')}
        />
        <MenuItem
          primaryText="Group by year of release"
          onClick={() => this.props.updateOrder('stream', 'release')}
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
          onClick={() => this.props.updateOrder('default', 'title', 'asc')}
        />
        <MenuItem
          primaryText="Order by note"
          onClick={() => this.props.updateOrder('default', 'note', 'desc')}
        />
        <MenuItem
          primaryText="Order by year of release"
          onClick={() => this.props.updateOrder('default', 'release', 'desc')}
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
    updateOrder: (...args) => dispatch(updateOrder(...args))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);