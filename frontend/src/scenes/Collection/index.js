import React, { Component } from 'react'
import PropTypes from 'prop-types';

import CollectionContent from './components/CollectionContent'
import AddingContent from './components/AddingContent';
import Menu from './components/Menu';

import { get as getCollection } from 'services/actions/collections'
import { connect } from 'services/redux';


class CollectionScene extends Component {
  static propTypes = {
    synchronize: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    isPublic: PropTypes.bool,
  };

  componentDidMount() {
    const { synchronize, loaded } = this.props;
    if (!loaded) {
      synchronize();
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

const Content = ({
  config,
  type,
  isAdding,
  isPublic,
  collection,
}) => {
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

Content.propTypes = {
  collection: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  isPublic: PropTypes.bool,
  isAdding: PropTypes.bool,
  config: PropTypes.object,
};

const mapStateToProps = ({ main, content }) => ({
  isAdding: main.isAdding,
  loaded: content.loaded,
});

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  synchronize: () => dispatch(getCollection(type, collection)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionScene);
