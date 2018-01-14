import { collectionTypes } from 'appConfig';

import mainReducer from 'scenes/Collection/reducer';
import contentReducer from 'scenes/Collection/components/CollectionContent/reducer';
import addingReducer from 'scenes/Collection/components/AddingContent/reducer';
import suggestionsReducer from 'scenes/ElementSuggestions/reducer';
import settingsReducer from 'scenes/CollectionSettings/reducer';
import headerReducer from 'components/appStructure/Header/reducer';

const defaultState = {};

collectionTypes.forEach(el => {
  defaultState[el.name] = {};
});

const reducer = (state = defaultState, action) => {

  if (!action.meta || !action.meta.type || !action.meta.collection) {
    return state;
  }

  const { type, collection } = action.meta;
  
  if (!state[type]) {
    state = {
      ...state,
      [type]: {}
    };
  }
  if(!state[type][collection.pk]) {
    state = {
      ...state,
      [type]: {
        [collection.pk]: {}
      }
    };
  }
  
  const oldState = state[type][collection.pk];

  state = {
    ...state,
    [type]: {
      [collection.pk]: {
        main: mainReducer(oldState.main, action),
        header: headerReducer(oldState.header, action),
        content: contentReducer(oldState.content, action),
        adding: addingReducer(oldState.adding, action),
        suggestions: suggestionsReducer(oldState.suggestions, action),
        settings: settingsReducer(oldState.settings, action),
      }
    }
  };

  return state;
  
};

export default reducer;