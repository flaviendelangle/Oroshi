import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import promiseMiddleware from 'redux-promise-middleware';

import header from 'components/Header/reducer';

import home from 'scenes/Home/reducer';
import movie from 'scenes/Movie/reducer';
import collection from 'components/genericScenes/Collection/reducer';
import collectionSettings from 'components/genericScenes/CollectionSettings/reducer';

import { notify } from 'services/titles/router';
import { screen } from 'services/titles/interface';
import { alertScreenResize } from '../services/actions/interface';


const defaultState = {
  lineDimensions: null
};

const app = (state=defaultState, action) => {
  
  switch(action.type) {
    
    case screen.resize:
      return {
        ...state,
        lineDimensions: action.lineDimensions
      };
      
    default:
      return state;
    
  }
  
};


const appReducer = combineReducers({
  
  app,
  
  // External modules
  form,
  
  // Generics
  header,
  
  // Scenes
  collection_movies: collection('movies'),
  collection_tv_shows: collection('tv_shows'),
  collection_movies_settings: collectionSettings('movies'),
  collection_tv_shows_settings: collectionSettings('tv_shows'),
  home,
  movie
});


const reducer = (state, action) => {
  
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

export const getCollectionSettingsState = (state, scene) => {
  return state['collection_' + scene + '_settings'];
};

export const getCollectionState = (state, scene) => {
  return state['collection_' + scene];
};

const composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);

let store = composeStoreWithMiddleware(reducer);

window.addEventListener('resize', () => {
  store.dispatch(alertScreenResize());
});

store.dispatch(alertScreenResize());

export default store;
