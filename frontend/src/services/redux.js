import { connect as _connect } from 'react-redux';

export const connect = (mapStateToProps, mapDispatchToProps, component) => {
  const customMapStateToProps = _customMapStateToProps.bind(this, mapStateToProps);
  return _connect(customMapStateToProps, mapDispatchToProps, component);
};

const _customMapStateToProps = (mapStateToProps, state, ownProps) => {
  const { scene, collection } = ownProps;
  if(scene && collection) {
    const sceneRoot = state.scenes[scene];
    if(!sceneRoot[collection.pk]) {
      return {
        loaded: false
      };
    } else {
      const newState = mapStateToProps(sceneRoot[collection.pk], state, ownProps);
      if(!newState.collection && ownProps.collection) {
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