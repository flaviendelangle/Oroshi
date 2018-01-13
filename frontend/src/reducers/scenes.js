import { collectionTypes } from 'appConfig';

import mainReducer from 'scenes/Collection/reducer';
import contentReducer from 'scenes/Collection/components/CollectionContent/reducer';
import addingReducer from 'scenes/Collection/components/AddingContent/reducer';
import headerReducer from 'scenes/Collection/components/Header/reducer';
import suggestionsReducer from 'scenes/ElementSuggestions/reducer';

const defaultState = {};

collectionTypes.forEach(el => {
  defaultState[el.name] = {};
});

const reducer = (state = defaultState, action) => {
  if (!action.meta || !action.meta.scene || !action.meta.collection) {
    return state;
  }

  const { scene, collection } = action.meta;
  
  if (!state[scene]) {
    state = {
      ...state,
      [scene]: {}
    };
  }
  if(!state[scene][collection.pk]) {
    state = {
      ...state,
      [scene]: {
        [collection.pk]: {}
      }
    };
  }
  
  const oldState = state[scene][collection.pk];

  state = {
    ...state,
    [scene]: {
      [collection.pk]: {
        main: mainReducer(oldState.main, action),
        header: headerReducer(oldState.header, action),
        content: contentReducer(oldState.content, action),
        adding: addingReducer(oldState.adding, action),
        suggestions: suggestionsReducer(oldState.suggestions, action)
      }
    }
  };

  return state;
  
};

export default reducer;