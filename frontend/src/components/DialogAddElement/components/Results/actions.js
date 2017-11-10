import * as publicAPI from 'services/actions/publicAPI'


export const save = (type, data) => {
  return publicAPI[type].addElementToCollection(data);
};