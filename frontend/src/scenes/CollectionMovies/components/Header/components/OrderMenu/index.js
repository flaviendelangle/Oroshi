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
          primaryText="Order by amount of movies desc"
          onClick={() => this.props.updateOrder('amount', 'desc', 'stream')}
        />
        <MenuItem
          primaryText="Order by amount of movies asc"
          onClick={() => this.props.updateOrder('amount', 'asc', 'stream')}
        />
        <MenuItem
          primaryText="Order by section desc"
          onClick={() => this.props.updateOrder('section', 'desc', 'stream')}
        />
        <MenuItem
          primaryText="Order by section asc"
          onClick={() => this.props.updateOrder('section', 'asc', 'stream')}
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
          primaryText="Order by title desc"
          onClick={() => this.props.updateOrder('title', 'desc', 'default')}
        />
        <MenuItem
          primaryText="Order by title asc"
          onClick={() => this.props.updateOrder('title', 'asc', 'default')}
        />
        <MenuItem
          primaryText="Order by note desc"
          onClick={() => this.props.updateOrder('note', 'desc', 'default')}
        />
        <MenuItem
          primaryText="Order by note asc"
          onClick={() => this.props.updateOrder('note', 'asc', 'default')}
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