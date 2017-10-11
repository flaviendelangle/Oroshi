const defaultState = {
  isAddingAMovie: false
};
const dialogAddMovieReducer = (state = defaultState, action) => {
  
  switch(action.type) {
    case 'SHOW_DIALOG_ADD_MOVIE' :
      state.isAddingAMovie = !state.isAddingAMovie;
      return state;
    default:
      return state;
  }
  
};

export default dialogAddMovieReducer;