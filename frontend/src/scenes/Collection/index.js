import React, { Component } from 'react'

import Header from './components/Header';
import CollectionContent from './components/CollectionContent'
import AddingContent from './components/AddingContent';
import Menu from './components/Menu';

import { get as getCollection } from 'services/actions/collections'
import { connect } from 'services/redux';

class CollectionScene extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.collection.pk);
  }
  
  render() {
    const { scene, collection, isPublic } = this.props;
    return (
      <div>
        <Header
          scene={scene}
          isPublic={isPublic}
          collection={collection}
        />
        <Content {...this.props} />
        <Menu
          scene={scene}
          isPublic={isPublic}
        />
      </div>
    )
    
  }
  
}

const Content = ({ config, scene, isAdding, isPublic, collection }) => {
  if (isAdding) {
    return (
      <AddingContent
        scene={scene}
        collection={collection}
        elementComponent={config.elementComponent}
        isPublic={isPublic}
      />
    );
  }
  return (
    <CollectionContent
      scene={scene}
      collection={collection}
      elementComponent={config.elementComponent}
      isPublic={isPublic}
    />
  );
};

const mapStateToProps = ({ main }) => {
  return {
    isAdding: main.isAdding,
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