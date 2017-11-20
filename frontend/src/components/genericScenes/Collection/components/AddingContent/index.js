import React, {Component} from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress';

import Grid from 'components/generics/Grid/index'
import Stream from 'components/generics/Stream/index'
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

class AddingContent extends Component {
  
  state = {
    query: '',
  };
  
  renderContent = () => {
    if(this.props.addingSearch) {
      return (
        <Grid
          data={this.props.addingSearch}
          collection={this.props.collection}
          order={this.props.order.default}
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
    if(!this.props.loaded) {
      return (
        <div style={progressStyle}>
          <CircularProgress />
        </div>
      );
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
    collection: root.collection,
    loaded: root.loaded,
    
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
