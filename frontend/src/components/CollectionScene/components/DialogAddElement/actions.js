import * as publicAPI from 'services/actions/publicAPI'

import { request } from 'services/titles/publicAPI'
import { dialogs } from 'services/titles/interface'

export const showDialog = show => {
  return {
    type: dialogs.addElement,
    show
  };
};

export const search = (type, collection, query) => {
  return {
    type: request.search,
    payload: publicAPI[type].search(collection, query)
  }
};