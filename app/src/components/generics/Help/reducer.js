import { element } from 'services/titles/help';

const defaultState = {
  element: null,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${element.loaded}_FULFILLED`: {
      return {
        ...state,
        element: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
