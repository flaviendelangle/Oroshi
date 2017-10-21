import { movie } from '../../../../services/actions/titles/api'

const defaultState = {
  posters: null
};

const posterReducer = (state = defaultState, action) => {
  switch(action.type) {
    
    case movie.load + '_FULFILLED':
      return {
        ...state,
        posters: action.payload.images.posters
      };
    
    default:
      return state;
  }
  
};

export default posterReducer;