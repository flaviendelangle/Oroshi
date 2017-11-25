import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import MenuPanel from './components/MenuPanel';
import ContentPanel from './components/ContentPanel';
import { getSettings } from 'services/actions/collections';

class CollectionSettings extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.match.params.collection_id);
  }
  
  render() {
    return (
      <div className="collection-settings">
        <Header scene={this.props.scene} />
        <MenuPanel scene={this.props.scene} />
        <ContentPanel scene={this.props.scene} />
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
  }
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