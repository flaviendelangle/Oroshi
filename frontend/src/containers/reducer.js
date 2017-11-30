import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import promiseMiddleware from 'redux-promise-middleware';

import home from 'scenes/Home/reducer';
import login from 'scenes/Login/reducer';
import movie from 'scenes/Movie/reducer';
import header from 'components/Header/reducer';
import tv_shows from 'components/TVShow/reducer';
import collections from 'components/genericScenes/Collection/reducer';
import collectionSettings from 'components/genericScenes/CollectionSettings/reducer';

import { notify } from 'services/titles/router';
import { screen } from 'services/titles/interface';
import { users } from 'services/titles/api';

import { alertScreenResize } from '../services/actions/interface';
import { loginFromCache, saveOauth, loadOauth } from '../services/actions/users';


const defaultState = {
  lineDimensions: null,
  oauth: null
};

const app = (state=defaultState, action) => {
  
  switch(action.type) {
    
    case screen.resize:
      return {
        ...state,
        lineDimensions: action.lineDimensions
      };
      
    case users.login + '_FULFILLED':
      if(action.payload.error) {
        return state;
      }
      console.log('LOADED');
      saveOauth(action.payload);
      return {
        ...state,
        oauth: action.payload
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
  
  // Elements
  tv_shows,
  
  // Scenes
  collections: collections,
  collection_movies_settings: collectionSettings('movies'),
  collection_tv_shows_settings: collectionSettings('tv_shows'),
  home,
  login,
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

/**
 * Return the current state of the settings of a collection
 * @param state - current root state of the application
 * @param scene - scene from which we want to get the state
 * @returns {Object} - state of the settings of our scene
 */
export const getCollectionSettingsState = (state, scene) => {
  return state['collection_' + scene + '_settings'];
};

const composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);

let store = composeStoreWithMiddleware(reducer);

window.addEventListener('resize', () => {
  store.dispatch(alertScreenResize());
});


store.dispatch(alertScreenResize());

const oauth = loadOauth();
if(oauth) {
  store.dispatch(loginFromCache(oauth));
}

export default store;
