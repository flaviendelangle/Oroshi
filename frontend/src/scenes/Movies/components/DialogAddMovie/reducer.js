const defaultState = {
  isAddingAMovie: false
};

const dialogAddMovieReducer = (state = defaultState, action) => {
  
  switch(action.type) {
    case 'SHOW_DIALOG_ADD_MOVIE' :
      return {
        ...state,
        isAddingAMovie: action.show
      };
    default:
      return state;
  }
  
};

export default dialogAddMovieReducer;