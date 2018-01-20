import React, { Component } from 'react'

import CollectionContent from './components/CollectionContent'
import AddingContent from './components/AddingContent';
import Menu from './components/Menu';

import { get as getCollection } from 'services/actions/collections'
import { connect } from 'services/redux';

class CollectionScene extends Component {
  
  componentDidMount() {
    const { synchronize, collection, loaded } = this.props;
    if (!loaded) {
      synchronize(collection.pk);
    }
  }
  
  render() {
    const { type, isPublic, collection } = this.props;
    return (
      <div>
        <Content {...this.props} />
        <Menu
          type={type}
          collection={collection}
          isPublic={isPublic}
        />
      </div>
    )
    
  }
  
}

const Content = ({ config, type, isAdding, isPublic, collection }) => {
  if (isAdding) {
    return (
      <AddingContent
        type={type}
        collection={collection}
        elementComponent={config.elementComponent}
        isPublic={isPublic}
      />
    );
  }
  return (
    <CollectionContent
      type={type}
      collection={collection}
      elementComponent={config.elementComponent}
      isPublic={isPublic}
    />
  );
};

const mapStateToProps = ({ main, content }) => {
  return {
    isAdding: main.isAdding,
    loaded: content.loaded
  }
};

const mapDispatchToProps = (dispatch, { type }) => {
  return {
    synchronize: (collection) => dispatch(getCollection(type, collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionScene);