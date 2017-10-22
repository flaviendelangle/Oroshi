import { collectionCreation } from '../../../../../../../../services/actions/titles/interface'

const defaultState = {
  string: ''
};

const IdenticonFieldReducer = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case collectionCreation.updateIdenticon:
      return {
        ...state,
        string: action.string
      };
    
    default:
      return state;
  }
  
};

export default IdenticonFieldReducer;