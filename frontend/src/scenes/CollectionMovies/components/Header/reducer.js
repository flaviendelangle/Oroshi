import { collections } from '../../../../services/actions/titles/api'

const defaultState = {
  collection: undefined,
  title: ''
};

const headerReducer = (state = defaultState, action) => {
  switch(action.type) {
  
    case collections.load + '_FULFILLED':
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