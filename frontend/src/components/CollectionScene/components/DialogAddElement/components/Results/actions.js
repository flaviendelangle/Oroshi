import { _addElementToCollection } from 'services/actions/api'


export const save = (scene, data) => {
  return _addElementToCollection(scene, data);
};