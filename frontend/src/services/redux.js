import { connect as _connect } from 'react-redux';

export const connect = (mapStateToProps, mapDispatchToProps, component) => {
  const customMapStateToProps = _customMapStateToProps.bind(this, mapStateToProps);
  return _connect(customMapStateToProps, mapDispatchToProps, component);
};

const _customMapStateToProps = (mapStateToProps, state, ownProps) => {
  const { type, collection } = ownProps;
  if (type && collection) {
    const typeRoot = state.types[type];
    if (!typeRoot[collection.pk]) {
      return {
        loaded: false
      };
    } else {
      const newState = mapStateToProps(typeRoot[collection.pk], state, ownProps);
      if (!newState.collection && ownProps.collection) {
        newState.collection = ownProps.collection;
      }
      return newState;
    }
  } else {
    return {
      loaded: false
    };
  }
  
};