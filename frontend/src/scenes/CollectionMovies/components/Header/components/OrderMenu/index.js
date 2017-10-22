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
  
  render() {
    return (
      <div style={containerStyle}>
        <IconMenu
          iconButtonElement={<IconButton><ContentSort /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem
            primaryText="Order by title desc"
            onClick={() => this.props.updateOrder('title', 'desc')}
          />
          <MenuItem
            primaryText="Order by title asc"
            onClick={() => this.props.updateOrder('title', 'asc')}
          />
          <MenuItem
            primaryText="Order by note desc"
            onClick={() => this.props.updateOrder('note', 'desc')}
          />
          <MenuItem
            primaryText="Order by note asc"
            onClick={() => this.props.updateOrder('note', 'asc')}
          />

        </IconMenu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateOrder: (field, direction) => dispatch(updateOrder(field, direction))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);