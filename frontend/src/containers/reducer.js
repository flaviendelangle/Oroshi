import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import header from 'components/Header/reducer'

import home from 'scenes/Home/reducer'
import movie from 'scenes/Movie/reducer'
import collection from 'components/CollectionScene/reducer'
import collectionSettings from 'scenes/CollectionSettings/reducer'
import { notify } from 'services/titles/router'


//collections[ownProps.type]
const appReducer = combineReducers({
  // External modules
  form,
  
  // Generics
  header,
  
  // Scenes
  collectionSettings,
  collection_movies: collection('movies'),
  collection_tv_shows: collection('tv_shows'),
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

export const getCollectionState = (state, scene) => {
  return state['collection_' + scene];
};


export default rootReducer;