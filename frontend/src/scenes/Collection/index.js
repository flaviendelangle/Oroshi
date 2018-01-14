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
    const { type, isPublic } = this.props;
    return (
      <div>
        <Content {...this.props} />
        <Menu
          type={type}
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

const mapStateToProps = ({ main }) => {
  return {
    isAdding: main.isAdding,
  }
};

const mapDispatchToProps = (dispatch, { type }) => {
  return {
    synchronize: collection => dispatch(getCollection(type, collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionScene);