import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NotFound from 'components/errors/NotFound';
import Grid from 'components/generics/Grid';
import Stream from 'components/generics/Stream';
import Progress from 'components/generics/Progress';
import Help from 'components/generics/Help';
import { connect } from "services/redux";

import * as _style from './style';


class CollectionContent extends Component {
  static propTypes = {
    collection: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    elementComponent: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    found: PropTypes.bool,
    content: PropTypes.array,
    isPublic: PropTypes.bool,
    lineDimensions: PropTypes.object,
    layout: PropTypes.string,
    grid: PropTypes.object,
    stream: PropTypes.object,
    order: PropTypes.object,
  };

  renderContent = () => {
    const {
      layout,
      grid,
      stream,
      collection,
      order,
      type,
      elementComponent,
      lineDimensions,
      isPublic,
    } = this.props;
    if (layout === 'grid') {
      return (
        <Grid
          data={grid}
          collection={collection}
          order={order.grid}
          type={type}
          elementComponent={elementComponent}
          lineDimensions={lineDimensions}
          isPublic={isPublic}
        />
      )
    } else if (layout === 'stream') {
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
    return null;
  };

  render() {
    const {
      loaded,
      found,
      content,
      collection,
      isPublic,
      type,
      elementComponent,
    } = this.props;
    if (!loaded) {
      return (
        <Progress />
      );
    } else if (!found) {
      return (<NotFound />)
    } else if (content.length === 0) {
      return (
        <Help
          type={type}
          collection={collection}
          elementComponent={elementComponent}
          isPublic={isPublic}
        />
      );
    }
    return (
      <div style={_style.page} >
        <div style={_style.container} >
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ content }, state) => ({
  update: content.update,
  content: content.content,
  grid: content.grid,
  stream: content.stream,
  collection: content.collection,
  found: content.found,
  loaded: content.loaded,
  layout: content.layout,
  order: content.order,

  lineDimensions: state.app.lineDimensions,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionContent);
