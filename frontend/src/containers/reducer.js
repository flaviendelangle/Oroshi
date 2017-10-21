import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import header from '../components/Header/reducer'

import home from '../scenes/Home/reducer'
import movie from '../scenes/Movie/reducer'
import collectionMovies from '../scenes/CollectionMovies/reducer'
import collectionSettings from '../scenes/CollectionSettings/reducer'
import { notify } from '../services/actions/titles/router'


const appReducer = combineReducers({
  // External modules
  form,
  
  // Generics
  header,
  
  // Scenes
  collectionMovies,
  collectionSettings,
  home,
  movie
});


const rootReducer = (state, action) => {
  

  switch(action.type) {
    
    case notify.change:
      const newState = {
        ...state,
        movie: undefined
      };
      return appReducer(newState, action);
    default:
      return appReducer(state, action);
    
  }
  
};


export default rootReducer;