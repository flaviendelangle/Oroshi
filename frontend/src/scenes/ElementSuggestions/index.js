import React, {Component} from 'react';


import Stream from 'components/generics/Stream';
import Header from './components/Header';
import { getSuggestions, getSettings } from "services/actions/collections";
import { connect } from 'services/redux';


class ElementSuggestions extends Component {
  
  componentDidMount() {
    const { collection_id, element_id } = this.props.match.params;
    const { loadCollection, synchronize } = this.props;
    loadCollection(collection_id).then( _  => {
      const { collection } = this.props;
      synchronize(element_id)
    });
  }
  
  render() {
    const {
      loaded,
      suggestions,
      collection,
      type,
      config,
      lineDimensions
    } = this.props;
    if(!loaded) {
      return null;
    }
    return [
      <Header
        type={type}
        collection={collection}
        key={1}
      />,
      <Stream
        data={suggestions}
        collection={collection}
        type={type}
        elementComponent={config.elementComponent}
        lineDimensions={lineDimensions}
        creationMode={true}
        key={2}
      />
    ];
  }
  
}

const mapStateToProps = ({ suggestions }, state) => {
  return {
    loaded: suggestions.loaded,
    collection: suggestions.collection,
    suggestions: suggestions.suggestions,
  
    lineDimensions: state.app.lineDimensions
  };
};

const mapDispatchToProps = (dispatch, { type, collection }) => {
  return {
    loadCollection: () => dispatch(getSettings(type, collection.pk)),
    synchronize: element_id => dispatch(getSuggestions(type, collection, element_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ElementSuggestions);