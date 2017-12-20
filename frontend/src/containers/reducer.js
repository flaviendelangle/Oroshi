import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import promiseMiddleware from 'redux-promise-middleware';

import home from 'scenes/Home/reducer';
import login from 'scenes/Login/reducer';
import header from 'components/Header/reducer';
import help from 'components/generics/Help/reducer';
import tv_shows from 'components/TVShow/reducer';
import collections from 'components/genericScenes/Collection/reducer';
import collectionSettings from 'components/genericScenes/CollectionSettings/reducer';

import { notify } from 'services/titles/router';
import { screen } from 'services/titles/interface';
import { users } from 'services/titles/api';

import { alertScreenResize } from '../services/actions/interface';
import { loginFromCache } from 'services/actions/users';
import { saveOauth, loadOauth } from 'services/localstorage';


const defaultState = {
  lineDimensions: null,
  oauth: null,
  profile: null,
  username: null
};

const app = (state=defaultState, action) => {
  
  switch(action.type) {
    
    case screen.resize:
      return {
        ...state,
        lineDimensions: action.lineDimensions
      };
      
    case users.login + '_FULFILLED':
      if (action.payload.error) {
        return state;
      }
      saveOauth(action.payload, action.meta);
      return {
        ...state,
        username: action.meta.username,
        oauth: action.payload
      };
      
    case users.getProfile + '_FULFILLED':
      return {
        ...state,
        profile: action.payload
      };
  
    case notify.change:
      const data = loadOauth();
      if (!data) {
        return {
          ...state,
          oauth: undefined,
          username: undefined
        };
      }
      const { oauth, meta } = data;
      return {
        ...state,
        oauth,
        username: meta.username
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
  help,
  
  // Elements
  tv_shows,
  
  // Scenes
  collections: collections,
  collection_movies_settings: collectionSettings('movies'),
  collection_tv_shows_settings: collectionSettings('tv_shows'),
  home,
  login
});


const reducer = (state, action) => {
  
  switch(action.type) {
    
    case notify.change:
      const newState = {
        ...state,
        collections: undefined
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

window.addEventListener('resize', _ => {
  store.dispatch(alertScreenResize());
});


store.dispatch(alertScreenResize());

const data = loadOauth();
if (data) {
  store.dispatch(loginFromCache(data));
}

export default store;
