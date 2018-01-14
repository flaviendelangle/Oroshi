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
    const { type, collection } = this.props;
    return (
      <div className="collection-settings">
        <Header type={type} collection={collection} />
        <MenuPanel type={type} collection={collection} />
        <ContentPanel type={type} collection={collection} />
      </div>
    );
  }
  
}

const mapStateToProps = ({ settings }) => {
  return {
    redirect: settings.redirect
  };
};

const mapDispatchToProps = (dispatch, { type }) => {
  return {
    synchronize: collection => dispatch(getSettings(type, collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionSettings);