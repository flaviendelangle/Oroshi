import React, {Component} from 'react';
import { connect } from 'react-redux';


import Stream from 'components/generics/Stream';
import Header from './components/Header';
import { getSuggestions, getSettings } from "services/actions/collections";


class ElementSuggestions extends Component {
  
  componentDidMount() {
    const { collection_id, element_id } = this.props.match.params;
    const { loadCollection, synchronize } = this.props;
    loadCollection(collection_id).then( _  => {
      const { collection } = this.props;
      synchronize(collection, element_id)
    });
  }
  
  render() {
    const {
      loaded,
      suggestions,
      collection,
      scene,
      config,
      lineDimensions
    } = this.props;
    if(!loaded) {
      return null;
    }
    return [
      <Header
        scene={scene}
        collection={collection}
        key={1}
      />,
      <Stream
        data={suggestions}
        collection={collection}
        scene={scene}
        elementComponent={config.elementComponent}
        lineDimensions={lineDimensions}
        creationMode={true}
        key={2}
      />
    ];
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