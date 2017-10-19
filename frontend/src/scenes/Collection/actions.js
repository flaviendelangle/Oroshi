import { CollectionsAPI } from '../../services/api/collections'
import { prepareMovies } from './services/utils'

export const loadCollection = pk => {
  return {
    type: 'LOAD_COLLECTION',
    payload: CollectionsAPI.retrieve(pk).then(response => {
      return prepareMovies(response);
    })
  }
};
