import React, {Component} from 'react';
import { connect } from 'react-redux';

import Grid from 'components/generics/Grid';
import Stream from 'components/generics/Stream';
import Progress from 'components/generics/Progress';
import Help from './components/Help';

import * as _style from './style';


class CollectionContent extends Component {
  
  state = {
    query: '',
  };
  
  renderContent = () => {
    if (this.props.layout === 'grid') {
      return (
        <Grid
          data={this.props.toShow}
          collection={this.props.collection}
          order={this.props.order.default}
          scene={this.props.scene}
          elementComponent={this.props.elementComponent}
          lineDimensions={this.props.lineDimensions}
        />
      )
    }
    else if (this.props.layout === 'stream') {
      return (
        <Stream
          data={this.props.stream}
          collection={this.props.collection}
          scene={this.props.scene}
          elementComponent={this.props.elementComponent}
          lineDimensions={this.props.lineDimensions}
        />
      )
    }
  };
  
  render() {
    if (!this.props.loaded) {
      return (
        <Progress />
      );
    }
    else if (!this.props.found) {
      return (<div>Not found</div>)
    }
    else if (this.props.content.length === 0 && !this.props.isAdding) {
      return (<Help/>)
    }
    else {
      return (
        <div style={_style.page}>
          <div style={_style.container}>
            {this.renderContent()}
          </div>
        </div>
      );
    }
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const root = state.collections.content[ownProps.scene];
  if (!root) {
    return {
      loaded: false
    };
  }

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
    
    lineDimensions: state.app.lineDimensions
  }
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionContent);
