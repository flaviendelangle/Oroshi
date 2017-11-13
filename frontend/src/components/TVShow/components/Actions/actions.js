import { _removeTVShowFromCollection } from 'services/actions/api'

export const removeTVShow = (collection, id) => {
  return _removeTVShowFromCollection(collection, id);
};