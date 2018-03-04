import typeManager from './type'


export const getConfig = type => typeManager.access(type).values.legacy


/*
  ACTIONS
 */
export const getActions = type => getConfig(type).actions

export const getPublicActions = type => getConfig(type).publicActions


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
