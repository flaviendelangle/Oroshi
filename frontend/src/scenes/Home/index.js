import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress';
import ScrollArea from 'react-scrollbar'

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
    if (true) {
      this.props.history.push('/login/');
    }
  }
  
  componentDidMount() {
    this.props.loadCollections();
  }
  
  render() {
    if (!this.props.loaded) {
      return (
        <div style={_style.progress}>
          <CircularProgress />
        </div>
      );
    } else if (this.props.collections.length === 0) {
      return (
        <div>
          <div style={_style.container}>
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
        <div style={_style.container}>
            <ManageButton
              editing={this.state.editing}
              onClick={() => this.setState({editing: !this.state.editing}) }
            />
            <CollectionList
              editing={this.state.editing}
              data={this.props.collections}
            />
        </div>
        </ScrollArea>
        <DialogCreateCollection/>
      </div>
    )
    
  }
  
}

const mapStateToProps = state => {
  return {
    collections: state.home.main.collections,
    loaded: state.home.main.loaded
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadCollections: () => dispatch(getCollections())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);