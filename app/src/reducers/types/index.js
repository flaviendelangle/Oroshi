import { mapValues } from 'lodash'

import { collectionTypes } from 'appConfig';

import mainReducer from 'reducers/types/main';
import contentReducer from 'reducers/types/content';
import addingReducer from 'reducers/types/adding';
import suggestionsReducer from 'reducers/types/suggestions';
import settingsReducer from 'reducers/types/settings';
import headerReducer from 'reducers/types/header';

const defaultState = {};

collectionTypes.forEach((el) => {
  defaultState[el.name] = {};
});

const computeNewState = (oldState, action) => ({
  main: mainReducer(oldState.main, action),
  header: headerReducer(oldState.header, action),
  content: contentReducer(oldState.content, action),
  adding: addingReducer(oldState.adding, action),
  suggestions: suggestionsReducer(oldState.suggestions, action),
  settings: settingsReducer(oldState.settings, action),
})

const updateOneState = (_state, action, type, collection) => {
  let state = { ..._state };
  if (!state[type]) {
    state = {
      ...state,
      [type]: {},
    };
  }
  if (!state[type][collection.pk]) {
    state = {
      ...state,
      [type]: {
        [collection.pk]: {},
      },
    };
  }
  const oldState = state[type][collection.pk];
  return {
  ...state,
    [type]: {
      [collection.pk]: computeNewState(oldState, action),
    },
  };
}

const updateAllStates = (state, action) => {
  return mapValues(state, categoryState => (
    mapValues(categoryState, elementState => (
      computeNewState(elementState, action)
    ))
  ))
}

const reducer = (state = defaultState, action) => {
  if (action.meta) {
    if (action.meta.common) {
      return updateAllStates(state, action)
    }
    if (action.meta.type && action.meta.collection) {
      const { type, collection } = action.meta;
      return updateOneState(state, action, type, collection)
    }
  }
  return state;
};

export default reducer;