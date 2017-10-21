const defaultState = {
  collection: undefined,
  title: ''
};

const headerReducer = (state = defaultState, action) => {
  switch(action.type) {
  
    case 'LOAD_COLLECTION_FULFILLED':
      if(!action.payload) {
        return state;
      }
      return {
        ...state,
        collection: action.payload.pk,
        title: action.payload.title
      };

    default:
      return state;
  }
  
};

export default headerReducer;