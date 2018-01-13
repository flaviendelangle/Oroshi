import { source, snacks } from 'services/titles/interface';
import { collections } from "services/titles/api";


const defaultState = {
  isAdding: false,
  messages: []
};

const main = (state = defaultState, action) => {
  
  let title, newMessage;
  
  switch(action.type) {
    
    /**
     * We enter / leave the adding more
     */
    case source.updateIsAdding:
      
      return {
        ...state,
        addingSearch: null,
        isAdding: !state.isAdding
      };
    
    /**
     * An element has been updated in the collection (ex : Not Seen => Seen)
     */
    case collections.update + '_FULFILLED':
      if(action.meta.type !== 'seen') {
        return state;
      }
      const seen = (action.payload.hasBeenSeen() ? '' : 'not ') + 'seen';
      title = action.payload.getTitle();
      newMessage = {
        content: title + ' marked as ' + seen
      };
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    
    /**
     * An element has been added to the collection
     */
    case collections.add + '_FULFILLED':
      title = action.payload.getTitle();
      newMessage = {
        content: title + ' added to your collection'
      };
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    
    /**
     * An element has been removed from the collection
     */
    case collections.remove + '_FULFILLED':
      title = action.payload.getTitle();
      newMessage = {
        content: title + ' removed from your collection'
      };
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    
    
    
    /**
     * A snack must be removed
     */
    case snacks.remove:
      return {
        ...state,
        messages: state.messages.slice(1)
      };
    
    default:
      return state;
  }
  
};


export default main;