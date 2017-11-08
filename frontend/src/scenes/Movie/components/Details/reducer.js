import { movie } from 'services/actions/titles/api'

const defaultState = {
  data: null
};

const posterReducer = (state = defaultState, action) => {
  switch(action.type) {
    
    case movie.load + '_FULFILLED':
      return {
        ...state,
        data: action.payload
      };
    
    default:
      return state;
  }
  
};

export default posterReducer;