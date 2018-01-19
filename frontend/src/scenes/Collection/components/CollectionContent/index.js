import React, {Component} from 'react';

import NotFound from 'components/errors/NotFound';
import Grid from 'components/generics/Grid';
import Stream from 'components/generics/Stream';
import Progress from 'components/generics/Progress';
import Help from 'components/generics/Help';
import { connect } from "services/redux";

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
      type,
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
          type={type}
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
          type={type}
          elementComponent={elementComponent}
          lineDimensions={lineDimensions}
          isPublic={isPublic}
        />
      )
    }
  };
  
  render() {
    const {
      loaded,
      found,
      content,
      collection,
      isAdding,
      isPublic,
      type,
      elementComponent
    } = this.props;
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
          type={type}
          collection={collection}
          elementComponent={elementComponent}
          isPublic={isPublic}
        />
      );
    }
    else {
      return (
        <div style={_style.page} >
          <div style={_style.container} >
            {this.renderContent()}
          </div>
        </div>
      );
    }
  }
  
}

const mapStateToProps = ({ content }, state) => {
  return {
    update: content.update,
    content: content.content,
    grid: content.grid,
    stream: content.stream,
    collection: content.collection,
    found: content.found,
    loaded: content.loaded,
    layout: content.layout,
    order: content.order,
    
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
