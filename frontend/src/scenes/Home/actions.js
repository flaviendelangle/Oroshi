import { CollectionsAPI } from '../../services/api/collections'

import { collections } from '../../services/actions/titles/api'

export const createCollection = data => {
  return {
    type: collections.create,
    payload: CollectionsAPI.create(data)
  };
};

export const loadCollections = () => {
  return {
    type: collections.loadAllSettings,
    payload: CollectionsAPI.settings()
  }
};