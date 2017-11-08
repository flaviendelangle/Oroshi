import { _loadCollectionSettings } from 'services/actions/api'

export const loadCollection = pk => {
  return _loadCollectionSettings(pk);
};