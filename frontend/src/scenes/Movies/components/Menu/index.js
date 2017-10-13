import React, { Component } from 'react'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import ContentAdd from 'material-ui/svg-icons/content/add'

import { showDialogAddMovie } from './../../components/DialogAddMovie/actions'


const menuIcon = (
  <FloatingActionButton>
    <ContentAdd />
  </FloatingActionButton>
);

const style = {
  position: 'absolute',
  bottom: '20px',
  right: '20px'
};

class Menu extends Component {
  
  constructor({ addMovie }) {
    super();
    this.addMovie = addMovie;
  }
  
  onItemClicked = (event, element) => {
    switch(element.props.name) {
      case 'add_movie':
        this.addMovie();
        break;
      default:
        return;
    }
  };
  
  render() {
    return (
  
      <IconMenu
        iconButtonElement={menuIcon}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
        onItemTouchTap={this.onItemClicked}
        style={style}
      >
        <MenuItem primaryText="Add a movie" name="add_movie" />
      </IconMenu>
      
      

      
    )
    
  };
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addMovie: () => {
      dispatch(showDialogAddMovie(true));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

