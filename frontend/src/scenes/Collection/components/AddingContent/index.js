import React, {Component} from 'react'

import Grid from 'components/generics/Grid';
import Stream from 'components/generics/Stream';
import Progress from 'components/generics/Progress';
import { connect } from 'services/redux';

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
          type={this.props.type}
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
        type={this.props.type}
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

const mapStateToProps = ({ adding }, state) => {
  return {
    loaded: adding.loaded,
    collection: adding.collection,
    recommendations: adding.recommendations,
    addingSearch: adding.addingSearch,
    
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
