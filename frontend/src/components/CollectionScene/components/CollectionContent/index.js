import React, {Component} from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress';

import List from './components/List/index'
import Help from './components/Help/index'
import Grid from './components/Grid/index'
import Stream from './components/Stream/index'
import { getCollectionState } from 'containers/reducer';

const progressStyle = {
  width: 40,
  height: 40,
  position: 'absolute',
  left: 'calc(50% - 20px)',
  top: 'calc(50% - 20px)',
};

const pageStyle = {
  position: 'fixed',
  top: 64,
  bottom: 0,
  right: 0,
  left: 0
};

const containerStyle = {
  position: 'relative',
  height: '100%'
};

class CollectionContent extends Component {
  
  state = {
    query: '',
  };
  
  renderIsNotAdding = () => {
    if(this.props.layout === 'grid') {
      return (
        <Grid
          data={this.props.toShow}
          collection={this.props.collection}
          order={this.props.order.default}
          scene={this.props.scene}
          elementComponent={this.props.elementComponent}
        />
      )
    }
    else if(this.props.layout === 'list') {
      return (
        <List
          data={this.props.toShow.results}
          collection={this.props.collection}
          scene={this.props.scene}
          columns={this.props.listColumns}
        />
      )
    }
    else if(this.props.layout === 'stream') {
      return (
        <Stream
          data={this.props.stream}
          collection={this.props.collection}
          scene={this.props.scene}
          elementComponent={this.props.elementComponent}
        />
      )
    }
  };
  
  renderIsAdding = () => {
    if(this.props.addingSearch) {
      return (
        <Grid
          data={this.props.addingSearch}
          collection={this.props.collection}
          order={this.props.order.default}
          scene={this.props.scene}
          elementComponent={this.props.elementComponent}
          creationMode={true}
        />
      )
    }
    return (
      <Stream
        data={this.props.recommendations}
        collection={this.props.collection}
        scene={this.props.scene}
        elementComponent={this.props.elementComponent}
        creationMode={true}
      />
    )
  };
  
  renderContent = () => {
    if(this.props.isAdding) {
      return this.renderIsAdding();
    }
    return this.renderIsNotAdding();
  };
  
  render() {
    if(!this.props.loaded) {
      return (
        <div style={progressStyle}>
          <CircularProgress />
        </div>
      );
    }
    else if(!this.props.found) {
      return (<div>Not found</div>)
    }
    else if(this.props.content.length === 0) {
      return (<Help/>)
    }
    else {
      return (
        <div style={pageStyle}>
          <div style={containerStyle}>
            {this.renderContent()}
          </div>
        </div>
      );
    }
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionState(state, ownProps.scene).main;
  return {
    update: root.update,
    content: root.content,
    toShow: root.toShow,
    stream: root.stream,
    collection: root.collection,
    found: root.found,
    loaded: root.loaded,
    layout: root.layout,
    order: root.order,
    isAdding: root.isAdding,
    recommendations: root.recommendations,
    addingSearch: root.addingSearch
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionContent);
