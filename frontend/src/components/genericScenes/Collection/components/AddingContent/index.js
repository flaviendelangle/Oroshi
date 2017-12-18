import React, {Component} from 'react'
import { connect } from 'react-redux'

import Grid from 'components/generics/Grid';
import Stream from 'components/generics/Stream';
import Progress from 'components/generics/Progress';

import * as _style from './style';


class AddingContent extends Component {
  
  state = {
    query: '',
  };
  
  renderContent = _ => {
    if (this.props.addingSearch) {
      return (
        <Grid
          data={this.props.addingSearch}
          collection={this.props.collection}
          scene={this.props.scene}
          elementComponent={this.props.elementComponent}
          lineDimensions={this.props.lineDimensions}
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
        lineDimensions={this.props.lineDimensions}
        creationMode={true}
      />
    )
  };
  
  render() {
    if (!this.props.loaded) {
      return (
        <Progress />
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
  const root = state.collections.addingContent[ownProps.scene];
  return {
    loaded: root.loaded,
    collection: root.collection,
    recommendations: root.recommendations,
    addingSearch: root.addingSearch,
    
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
)(AddingContent);
