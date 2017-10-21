import { CollectionsAPI } from '../../services/api/collections'

export const createCollection = data => {
  return {
    type: 'CREATE_NEW_COLLECTION',
    payload: CollectionsAPI.create(data)
  };
};

export const loadCollections = () => {
  return {
    type: 'LOAD_COLLECTIONS',
    payload: CollectionsAPI.list()
  }
};