const defaultState = {
  title: ''
};

const posterReducer = (state = defaultState, action) => {
  switch(action.type) {
    
    case 'LOAD_MOVIE_FULFILLED':
      return {
        ...state,
        title: action.payload.title
      };
    
    default:
      return state;
  }
  
};

export default posterReducer;