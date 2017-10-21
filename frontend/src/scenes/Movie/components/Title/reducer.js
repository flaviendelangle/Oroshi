import { movie } from '../../../../services/actions/titles/api'

const defaultState = {
  title: '',
  date: undefined,
  note: 0
};

const posterReducer = (state = defaultState, action) => {
  switch(action.type) {
    
    case movie.load + '_FULFILLED':
      return {
        ...state,
        release: action.payload.release_date,
        title: action.payload.title,
        note: action.payload.vote_average
      };
    
    default:
      return state;
  }
  
};

export default posterReducer;