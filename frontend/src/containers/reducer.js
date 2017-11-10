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
  collectionMovies: collection('movies'),
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

export const getCollectionState = (state, type) => {
  return state['collection' + type[0].toUpperCase() + type.slice(1)];
};


export default rootReducer;