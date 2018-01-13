import TMDBAPI from 'services/TheMovieDatabaseJS/index';

import { collectionContent, collections } from 'services/titles/api';
import { sort, search } from 'services/titles/data';
import { layout } from 'services/titles/interface';

import { getListGenerator, getStreamGenerator, getDefaultOrder } from 'services/content';
import { getValue } from 'services/localstorage';
import Element from 'services/content/element';
import { setSortParameters, setLayoutParameters } from '../../services/utils';
import * as content_manager from './services/content_manager';


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
    grid: new ListGenerator(),
  };
};

const reducer = (state, action) => {

  const scene = action.meta.scene;
  if(!state) {
    state = generateDefaultElementState(scene);
  }
  
  let newContent;
  let newOrder;
  
  const ListGenerator = getListGenerator(scene);
  const StreamGenerator = getStreamGenerator(scene);
  const defaultOrder = getDefaultOrder(scene);
  
  switch(action.type) {
    
    /**
     * The collection has been loaded
     */
    case collectionContent.load + '_FULFILLED':
      if (!action.payload) {
        return {
          ...state,
          found: false,
          loaded: true
        }
      }
      TMDBAPI.set_config({
        include_adult: action.payload.adult_content,
        language: action.payload.title_language
      });
      newContent = Element.sortList(
        action.payload.content,
        state.order.default
      );
      return {
        ...state,
        collection: action.payload,
        content: newContent,
        stream: new StreamGenerator(newContent, state.query, state.order.stream),
        grid: new ListGenerator(newContent, state.query),
        autoComplete: Element.buildAutocomplete(newContent, state.order.stream),
        found: true,
        loaded: true
      };
    
    /**
     * An element has been added to the collection
     */
    case collections.add + '_FULFILLED':
      
      newContent = content_manager.add(state.content, action.payload, state.order.default);
      
      return {
        ...state,
        content: newContent,
        stream: new StreamGenerator(newContent, state.query, state.order.stream),
        grid: new ListGenerator(newContent, state.query),
        autoComplete: Element.buildAutocomplete(newContent, state.order.stream),
      };
    
    /**
     * An element has been removed from the collection
     */
    case collections.remove + '_FULFILLED':
      
      newContent = content_manager.remove(state.content, action.payload);
      
      return {
        ...state,
        content: newContent,
        stream: new StreamGenerator(newContent, state.query, state.order.stream),
        grid: new ListGenerator(newContent, state.query),
        autoComplete: Element.buildAutocomplete(newContent, state.order.stream)
      };
    
    /**
     * An element has been updated in the collection (ex : Not Seen => Seen)
     */
    case collections.update + '_FULFILLED':
      
      newContent = content_manager.update(state.content, action.payload);
      
      return {
        ...state,
        content: newContent,
        stream: new StreamGenerator(newContent, state.query, state.order.stream),
        grid: new ListGenerator(newContent, state.query),
        autoComplete: Element.buildAutocomplete(newContent, state.order.stream)
      };
    
    
    /**
     * The order of the elements has been updated (check OrderMenu component)
     */
    case sort.update:
      setSortParameters(scene, action.parameters, defaultOrder);
      if (action.parameters.layout === 'grid') {
        newContent = Element.sortList(state.content, action.parameters);
      } else {
        newContent = state.content;
      }
      newOrder = {
        ...state.order,
        [action.parameters.layout]: action.parameters
      };
      return {
        ...state,
        order: newOrder,
        content: newContent,
        stream: new StreamGenerator(newContent, state.query, newOrder.stream),
        grid: new ListGenerator(newContent, state.query),
        autoComplete: Element.buildAutocomplete(newContent, newOrder.stream),
        update: Math.random()
      };
    
    /**
     * The search query has been updated (check Header's Search component)
     */
    case search.update_query:
      if (this.isAdding) {
        return state;
      }
      return {
        ...state,
        query: action.query,
        stream: new StreamGenerator(state.content, action.query, state.order.stream),
        grid: new ListGenerator(state.content, action.query)
      };
    
    /**
     * The layout in which we want to see the elements has been updated
     */
    case layout.update:
      setLayoutParameters(scene, action.layout);
      return {
        ...state,
        query: '',
        layout: action.layout
      };
    
    default:
      return state;
  }

  
};

export default reducer;