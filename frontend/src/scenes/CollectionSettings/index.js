import React, { Component } from 'react';

import Header from './components/Header';
import MenuPanel from './components/MenuPanel';
import ContentPanel from './components/ContentPanel';
import { getSettings } from 'services/actions/collections';
import { connect } from 'services/redux';

class CollectionSettings extends Component {
  
  componentDidMount() {
    const { synchronize, collection } = this.props;
    synchronize(collection.pk);
  }
  
  componentWillReceiveProps(newProps) {
    const { redirect, history } = this.props;
    if (!redirect && newProps.redirect) {
      history.push(newProps.redirect);
    }
  }
  
  render() {
    const { scene, collection } = this.props;
    return (
      <div className="collection-settings">
        <Header scene={scene} collection={collection} />
        <MenuPanel scene={scene} collection={collection} />
        <ContentPanel scene={scene} collection={collection} />
      </div>
    );
  }
  
}

const mapStateToProps = ({ settings }) => {
  return {
    redirect: settings.redirect
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    synchronize: collection => dispatch(getSettings(ownProps.scene, collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionSettings);