import { CollectionsAPI } from 'services/api/collections'

import { collectionContent } from 'services/titles/api'

export const loadCollections = () => {
  return {
    type: collectionContent.loadAllSettings,
    payload: CollectionsAPI.settings()
  }
};

