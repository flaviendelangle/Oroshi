import React, { Component } from 'react'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { showDialogAddMovie } from './../../components/DialogAddMovie/actions'


const style = {
  position: 'fixed',
  bottom: '20px',
  right: '20px'
};

class Menu extends Component {
  
  constructor({ addMovie }) {
    super();
    this.addMovie = addMovie;
  }
  
  render() {
    return (
      <FloatingActionButton style={style} onClick={this.addMovie}>
        <ContentAdd/>
      </FloatingActionButton>
      
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

