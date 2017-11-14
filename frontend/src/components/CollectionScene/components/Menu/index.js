import React, { Component } from 'react'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionViewList from 'material-ui/svg-icons/action/view-list'
import ActionViewModule from 'material-ui/svg-icons/action/view-module'
import ActionViewStream from 'material-ui/svg-icons/action/view-stream'

import { getCollectionState } from 'containers/reducer';
import { switchAddingMode } from '../../actions'
import { switchLayout } from '../CollectionContent/actions'
import { getRecommendations } from 'services/actions/publicAPI'


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
  
  renderLayout = () => {
    if(this.props.isAdding) {
    
    }
    return (
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
    );
  };
  
  render() {
    return (
      <span>
        <FloatingActionButton
          style={addStyle}
          onClick={() => this.props.switchAddingMode(this.props.collection)}
        >
          <ContentAdd/>
        </FloatingActionButton>
        
        {this.renderLayout()}
      </span>
    )
    
  };
  
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionState(state, ownProps.scene).main;
  return {
    isAdding: root.isAdding,
    collection: root.collection
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchAddingMode: collection => {
      dispatch(switchAddingMode(ownProps.scene));
      dispatch(getRecommendations(ownProps.scene, collection));
    },
    switchLayout: layout => dispatch(switchLayout(ownProps.scene, layout))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

