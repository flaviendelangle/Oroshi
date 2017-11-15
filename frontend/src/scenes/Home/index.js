import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress';
import ScrollArea from 'react-scrollbar'

import CollectionList from './components/CollectionList'
import ManageButton from './components/ManageButton'
import FirstCollectionButton from './components/FirstCollectionButton'
import DialogCreateCollection from './components/DialogCreateCollection'
import { getAll as getCollections } from 'services/actions/collections'

const scrollStyle = {
  position: 'absolute',
  top: '50%',
  right: 0,
  left: 0,
  transform: 'translateY(-50%)',
};

const containerStyle = {
  margin: '50px auto',
  width: '80%'
};

const progressStyle = {
  width: 40,
  height: 40,
  position: 'absolute',
  left: 'calc(50% - 20px)',
  top: 'calc(50% - 20px)',
};

class Home extends Component {
  
  state = {
    editing: false,
  };
  
  componentDidMount() {
    this.props.loadCollections();
  }
  
  render() {
    if(!this.props.loaded) {
      return (
        <div style={progressStyle}>
          <CircularProgress />
        </div>
      );
    } else if(this.props.collections.length === 0) {
      return (
        <div>
          <div style={containerStyle}>
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
          style={scrollStyle}
        >
        <div style={containerStyle}>
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