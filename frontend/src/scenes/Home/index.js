import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress';

import CollectionList from './components/CollectionList'
import ManageButton from './components/ManageButton'
import DialogCreateCollection from './components/DialogCreateCollection'
import { loadCollections } from './actions'

const containerStyle = {
  width: '80%',
  left: '10%',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
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
    }
    return (
      <div>
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
    loadCollections: () => dispatch(loadCollections())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);