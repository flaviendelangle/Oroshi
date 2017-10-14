const defaultState = {
  data: {
    results: []
  }
};

const moviesListReducer = (state = defaultState, action) => {
  
  switch(action.type) {
    case 'UPDATE_AUTO_COMPLETE_DIALOG_ADD_MOVIE':
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
  
};

export default moviesListReducer;