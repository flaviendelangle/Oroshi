const defaultState = {
  data: null
};

const posterReducer = (state = defaultState, action) => {
  switch(action.type) {
    
    case 'LOAD_MOVIE_FULFILLED':
      return {
        ...state,
        data: action.payload
      };
    
    default:
      return state;
  }
  
};

export default posterReducer;