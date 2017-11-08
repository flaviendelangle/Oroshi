import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress';

import List from './components/List'
import Help from './components/Help'
import Grid from './components/Grid'
import Stream from './components/Stream'

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
  
  renderContent = () => {
    if(this.props.layout === 'grid') {
      return (
        <Grid
          data={this.props.toShow.results}
          collection={this.props.collection}
          order={this.props.order.default}
          type={this.props.type}
          elementComponent={this.props.elementComponent}
        />
      )
    }
    else if(this.props.layout === 'list') {
      return (
        <List
          data={this.props.toShow.results}
          collection={this.props.collection}
          type={this.props.type}
          columns={this.props.listColumns}
        />
      )
    }
    else if(this.props.layout === 'stream') {
      return (
        <Stream
          data={this.props.stream}
          collection={this.props.collection}
          type={this.props.type}
          elementComponent={this.props.elementComponent}
        />
      )
    }
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

export default CollectionContent;