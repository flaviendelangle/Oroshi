import React, {Component} from 'react';
import { connect } from 'react-redux';


import Stream from 'components/generics/Stream';
import { getSuggestions, getSettings } from "services/actions/collections";


class ElementSuggestions extends Component {
  
  componentDidMount() {
    const { collection_id, element_id } = this.props.match.params;
    this.props.loadCollection(collection_id).then( _  => {
      this.props.synchronize(this.props.collection, element_id)
    });
  }
  
  render() {
    if(!this.props.loaded) {
      return null;
    }
    return (
      <Stream
        data={this.props.suggestions}
        collection={this.props.collection}
        scene={this.props.scene}
        elementComponent={this.props.config.elementComponent}
        lineDimensions={this.props.lineDimensions}
        creationMode={true}
      />
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const root = state.elementSuggestions.main[ownProps.scene];
  if(!root) {
    return {
      loaded: false
    };
  }
  return {
    loaded: root.loaded,
    collection: root.collection,
    suggestions: root.suggestions,
  
    lineDimensions: state.app.lineDimensions
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCollection: pk => dispatch(getSettings(ownProps.scene, pk)),
    synchronize: (...args) => dispatch(getSuggestions(ownProps.scene, ...args))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ElementSuggestions);