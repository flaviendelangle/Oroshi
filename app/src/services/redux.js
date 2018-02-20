import { connect as _connect } from 'react-redux'

const customMapStateToProps = (mapStateToProps, state, ownProps) => {
  const { type, collection } = ownProps
  if (type && collection) {
    const typeRoot = state.types[type]
    if (!typeRoot[collection.pk]) {
      return {
        isLoaded: false,
      }
    }
    const newState = mapStateToProps(typeRoot[collection.pk], state, ownProps)
    if (!newState.collection && ownProps.collection) {
      newState.collection = ownProps.collection
    }
    return newState
  }
  return {
    isLoaded: false,
  }
}

// eslint-disable-next-line import/prefer-default-export
export const connect = (mapStateToProps, mapDispatchToProps, component) => {
  const method = customMapStateToProps.bind(this, mapStateToProps)
  return _connect(method, mapDispatchToProps, component)
}
