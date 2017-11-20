import TMDBAPI from 'services/TheMovieDatabaseJS/index';

import { collectionContent, collections } from 'services/titles/api';
import { sort, search } from 'services/titles/data';
import { layout } from 'services/titles/interface';

import { getListGenerator, getStreamGenerator, getDefaultOrder } from 'services/content/';
import { getValue } from 'services/localstorage';
import { sortElements, setSortParameters, setLayoutParameters } from '../../services/utils';
import { addSeenToElements, addCollectionToElement } from 'services/actions/collections';
import * as content_manager from './services/content_manager';


const defaultState = {};

const generateDefaultElementState = scene => {
  
  const ListGenerator = getListGenerator(scene);
  const StreamGenerator = getStreamGenerator(scene);
  
  const defaultOrder = getDefaultOrder(scene);
  
  return {
    content: [],
    query: '',
    collection: null,
    found: false,
    loaded: false,
    layout: getValue('layout_' + scene) || 'grid',
    order: getValue('order_' + scene) || defaultOrder,
    stream: new StreamGenerator(),
    toShow: new ListGenerator(),
  };
};

const reducer = (state = defaultState, action) => {
  
  if(!action.meta || !action.meta.scene) {
    return state;
  }
  const scene = action.meta.scene;
  
  if(!state[scene]) {
    state = {
      ...state,
      [scene]: generateDefaultElementState(scene)
    };
  }
  
  const sceneReducer = sceneState => {
    
    let newContent, newElement, newOrder;
  
    const ListGenerator = getListGenerator(scene);
    const StreamGenerator = getStreamGenerator(scene);
    const defaultOrder = getDefaultOrder(scene);
  
    switch(action.type) {
    
      /**
       * The collection has been loaded
       */
      case collectionContent.load + '_FULFILLED':
        if(!action.payload) {
          return {
            ...sceneState,
            found: false,
            loaded: true
          }
        }
        TMDBAPI.set_config({
          include_adult: action.payload.adult_content,
          language: action.payload.title_language
        });
        newContent = sortElements(
          action.payload.content,
          sceneState.order.default
        );
        return {
          ...sceneState,
          collection: action.payload,
          content: newContent,
          stream: new StreamGenerator(newContent, sceneState.query, sceneState.order.stream),
          toShow: new ListGenerator(newContent, sceneState.query),
          found: true,
          loaded: true
        };
    
      /**
       * An element has been added to the collection
       */
      case collections.add + '_FULFILLED':
      
        newContent = content_manager.add(sceneState.content, action.payload, sceneState.order.default);
      
        return {
          ...sceneState,
          content: newContent,
          stream: new StreamGenerator(newContent, sceneState.query, sceneState.order.stream),
          toShow: new ListGenerator(newContent, sceneState.query)
        };
    
      /**
       * An element has been removed from the collection
       */
      case collections.remove + '_FULFILLED':
        newElement = action.payload;
      
        newContent = content_manager.remove(sceneState.content, action.payload);
      
        return {
          ...sceneState,
          content: newContent,
          stream: new StreamGenerator(newContent, sceneState.query, sceneState.order.stream),
          toShow: new ListGenerator(newContent, sceneState.query),
        };
    
      /**
       * An element has been updated in the collection (ex : Not Seen => Seen)
       */
      case collections.update + '_FULFILLED':
        newContent = addSeenToElements(scene, sceneState.content, action.payload);
        return {
          ...sceneState,
          content: newContent,
          stream: new StreamGenerator(newContent, sceneState.query, sceneState.order.stream),
          toShow: new ListGenerator(newContent, sceneState.query)
        };
    
    
      /**
       * The order of the elements has been updated (check OrderMenu component)
       */
      case sort.update:
        setSortParameters(scene, action.parameters, defaultOrder);
        if(action.parameters.layout === 'default') {
          newContent = sortElements(sceneState.content, action.parameters);
        } else {
          newContent = sceneState.content;
        }
        newOrder = {
          ...sceneState.order,
          [action.parameters.layout]: action.parameters
        };
        return {
          ...sceneState,
          order: newOrder,
          content: newContent,
          stream: new StreamGenerator(newContent, sceneState.query, newOrder.stream),
          toShow: new ListGenerator(newContent, sceneState.query),
          update: Math.random()
        };
    
      /**
       * The search query has been updated (check Header's Search component)
       */
      case search.update_query:
        if(this.isAdding) {
          return sceneState;
        }
        return {
          ...sceneState,
          query: action.query,
          stream: new StreamGenerator(sceneState.content, action.query, sceneState.order.stream),
          toShow: new ListGenerator(sceneState.content, action.query)
        };
    
      /**
       * The layout in which we want to see the elements has been updated
       */
      case layout.update:
        setLayoutParameters(scene, action.layout);
        return {
          ...sceneState,
          query: '',
          layout: action.layout,
          stream: new StreamGenerator(sceneState.content, '', sceneState.order.stream),
          toShow: new ListGenerator(sceneState.content, '')
        };
      
      default:
        return sceneState;
    }
    
  };
  
  return {
    ...state,
    [scene]: sceneReducer(state[scene])
  };
  
};

export default reducer;