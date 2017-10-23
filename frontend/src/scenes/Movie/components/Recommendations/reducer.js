import { movie } from '../../../../services/actions/titles/api'

const defaultState = {
  movies: {}
};

const recommendationsReducer = (state = defaultState, action) => {
  switch(action.type) {
    
    case movie.load + '_FULFILLED':
      return {
        ...state,
        movies: action.payload.recommendations
      };
    
    default:
      return state;
  }
  
};

export default recommendationsReducer;