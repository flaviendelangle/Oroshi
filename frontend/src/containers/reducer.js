import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import header from '../components/Header/reducer'

import home from '../scenes/Home/reducer'
import movie from '../scenes/Movie/reducer'
import collectionMovies from '../scenes/CollectionMovies/reducer'
import collectionSettings from '../scenes/CollectionSettings/reducer'

const reducer = combineReducers({
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


export default reducer;