import React, { Component } from 'react'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionViewList from 'material-ui/svg-icons/action/view-list'
import ActionViewModule from 'material-ui/svg-icons/action/view-module'
import ActionViewStream from 'material-ui/svg-icons/action/view-stream'

import { showDialogAddMovie } from './../../components/DialogAddMovie/actions'
import { switchLayout } from '../MoviesData/actions'


const addStyle = {
  position: 'fixed',
  bottom: 20,
  right: 20
};

const layoutStyle = {
  position: 'fixed',
  top: 84,
  right: 20
};

class Menu extends Component {
  
  render() {
    return (
      <span>
        <FloatingActionButton
          style={addStyle}
          onClick={this.props.addMovie}
        >
          <ContentAdd/>
        </FloatingActionButton>
        
        <div style={layoutStyle}>
          <ActionViewList
            style={{marginRight: 10, cursor: 'pointer'}}
            onClick={() => this.props.switchLayout('list')}
          />
          <ActionViewModule
            style={{marginRight: 10, cursor: 'pointer'}}
            onClick={() => this.props.switchLayout('grid')}
          />
          <ActionViewStream
            style={{cursor: 'pointer'}}
            onClick={() => this.props.switchLayout('stream')}
          />
        </div>
      </span>
    )
    
  };
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addMovie: () => dispatch(showDialogAddMovie(true)),
    switchLayout: (layout) => dispatch(switchLayout(layout))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

