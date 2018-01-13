import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import MenuPanel from './components/MenuPanel';
import ContentPanel from './components/ContentPanel';
import { getSettings } from 'services/actions/collections';
import { getCollectionSettingsState } from 'containers/reducer';


class CollectionSettings extends Component {
  
  componentDidMount() {
    const { synchronize, match: { params }} = this.props;
    synchronize(params.collection_id);
  }
  
  componentWillReceiveProps(newProps) {
    const { redirect, history } = this.props;
    if (!redirect && newProps.redirect) {
      history.push(newProps.redirect);
    }
  }
  
  render() {
    const { scene } = this.props;
    return (
      <div className="collection-settings">
        <Header scene={scene} />
        <MenuPanel scene={scene} />
        <ContentPanel scene={scene} />
      </div>
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionSettingsState(state, ownProps.scene).main;
  return {
    redirect: root.redirect
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