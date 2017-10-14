const defaultState = {};

const saveButtonReducer = (state = defaultState, action) => {
  let id, movieState, newState;
  switch(action.type) {
    case 'UPDATE_SAVE_BUTTON_VISIBILITY':
      console.log(action);
      id = action.id;
      movieState = state[id];
      if(!movieState) {
        newState = {
          show: action.show
        }
      } else {
        newState = {
          ...state,
          show: action.show
        }
      }
      let data = {
        ...state,
        [id]: newState
      };
      return data;
    case 'ADD_MOVIE_TO_SERVER_FULFILLED':
      id = action.payload.tmdbId;
      movieState = state[id];
      if(!movieState) {
        newState = {
          show: false
        }
      } else {
        newState = {
          ...state,
          show: false
        }
      }
      return {
        ...state,
        [id]: newState
      };
    default:
      return state;
  }
  
};

export default saveButtonReducer;