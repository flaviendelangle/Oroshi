import tM from './type'


export const getConfig = type => tM.access(type).values.legacy


/*
  API
 */
export const getCollectionAPI = type => getConfig(type).collectionAPI

export const getElementAPI = type => getConfig(type).elementAPI

export const getPublicAPI = type => getConfig(type).publicAPI


/*
  CONTENT MANAGERS
 */
export const getElementClass = type => getConfig(type).elementClass
