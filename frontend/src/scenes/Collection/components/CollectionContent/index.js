import React, {Component} from 'react';
import { connect } from 'react-redux';

import NotFound from 'components/errors/NotFound';
import Grid from 'components/generics/Grid';
import Stream from 'components/generics/Stream';
import Progress from 'components/generics/Progress';
import Help from 'components/generics/Help';

import * as _style from './style';


class CollectionContent extends Component {
  
  state = {
    query: '',
  };
  
  renderContent = _ => {
    const {
      layout,
      grid,
      stream,
      collection,
      order,
      scene,
      elementComponent,
      lineDimensions,
      isPublic
    } = this.props;
    if (layout === 'grid') {
      return (
        <Grid
          data={grid}
          collection={collection}
          order={order.default}
          scene={scene}
          elementComponent={elementComponent}
          lineDimensions={lineDimensions}
          isPublic={isPublic}
        />
      )
    }
    else if (layout === 'stream') {
      return (
        <Stream
          data={stream}
          collection={collection}
          scene={scene}
          elementComponent={elementComponent}
          lineDimensions={lineDimensions}
          isPublic={isPublic}
        />
      )
    }
  };
  
  render() {
    const { loaded, found, content, collection, isAdding, isPublic,
            scene, elementComponent } = this.props;
    if (!loaded) {
      return (
        <Progress />
      );
    }
    else if (!found) {
      return (<NotFound />)
    }
    else if (content.length === 0 && !isAdding) {
      return (
        <Help
          scene={scene}
          collection={collection}
          elementComponent={elementComponent}
          isPublic={isPublic}
        />
      );
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
    grid: root.grid,
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
