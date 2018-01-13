import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './components/Header';
import CollectionContent from './components/CollectionContent'
import AddingContent from './components/AddingContent';
import Menu from './components/Menu';

import { get as getCollection } from 'services/actions/collections'
import { bindState } from 'services/decorators';

class CollectionScene extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.match.params.collection_id);
  }
  
  render() {
    return (
      <div>
        <Header
          scene={this.props.scene}
          isPublic={this.props.isPublic}
        />
        <Content {...this.props} />
        <Menu
          scene={this.props.scene}
          isPublic={this.props.isPublic}
        />
      </div>
    )
    
  }
  
}

const Content = ({ config, scene, isAdding, isPublic }) => {
  if (isAdding) {
    return (
      <AddingContent
        scene={scene}
        elementComponent={config.elementComponent}
        isPublic={isPublic}
      />
    );
  }
  return (
    <CollectionContent
      scene={scene}
      elementComponent={config.elementComponent}
      isPublic={isPublic}
    />
  );
};

@bindState
const mapStateToProps = (state, ownProps) => {
  const root = state.collections.main[ownProps.scene];
  if (!root) {
    return {
      isAdding: false
    };
  }
  return {
    isAdding: root.isAdding,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    synchronize: collection => dispatch(getCollection(ownProps.scene, collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionScene);