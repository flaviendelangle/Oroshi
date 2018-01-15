import { collectionTypes } from 'appConfig';

import mainReducer from 'reducers/types/main';
import contentReducer from 'reducers/types/content';
import addingReducer from 'reducers/types/adding';
import suggestionsReducer from 'reducers/types/suggestions';
import settingsReducer from 'reducers/types/settings';
import headerReducer from 'reducers/types/header';

const defaultState = {};

collectionTypes.forEach(el => {
  defaultState[el.name] = {};
});

const reducer = (state = defaultState, action) => {
  // console.log(action.type);
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
  if (!state[type][collection.pk]) {
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