import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import ScrollArea from 'react-scrollbar';
import CircularProgress from 'material-ui/CircularProgress';

import CollectionList from './components/CollectionList'
import ManageButton from './components/ManageButton'
import FirstCollectionButton from './components/FirstCollectionButton'
import DialogCreateCollection from './components/DialogCreateCollection'
import { getAll as getCollections } from 'services/actions/collections'

import * as _style from './style';

class Home extends Component {
  
  state = {
    editing: false,
  };
  
  constructor(props) {
    super(props);
    if (!this.props.oauth) {
      this.props.history.push('/login/');
    }
  }
  
  componentDidMount() {
    if (this.props.profile) {
      this.loadCollections(this.props.profile);
    }
  }
  
  componentWillReceiveProps(newProps) {
    if (
      newProps.profile &&
      !this.props.profile
    ) {
      this.loadCollections(newProps.profile);
    }
  }
  
  loadCollections = (profile) => {
    this.props.loadCollections(profile.pk);
  };
  
  render() {
    const { loaded, collections } = this.props;
    const { editing } = this.state;
    if (!loaded) {
      return (
        <div style={_style.progress} >
          <CircularProgress />
        </div>
      );
    } else if (collections.length === 0) {
      return (
        <div>
          <div style={_style.container} >
            <FirstCollectionButton/>
          </div>
          <DialogCreateCollection/>
        </div>
      );
    }
    return (
      <div>
        <ScrollArea
          speed={0.8}
          horizontal={false}
          style={_style.scroll}
        >
        <div style={_style.container} >
            <ManageButton
              editing={editing}
              onClick={() => this.setState({editing: !editing}) }
            />
            <CollectionList
              editing={editing}
              data={collections}
            />
        </div>
        </ScrollArea>
        <DialogCreateCollection/>
      </div>
    )
    
  }
  
}

const mapStateToProps = (state) => {
  const root = state.home.main;
  const appRoot = state.app;
  return {
    collections: root.collections,
    loaded: root.loaded,
    oauth: appRoot.oauth,
    profile: appRoot.profile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCollections: (pk) => dispatch(getCollections(pk))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);