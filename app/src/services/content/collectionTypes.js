import { collectionTypes } from '../../appConfig'

export const getConfig = type => collectionTypes.find(el => el.name === type)

export const getActions = type => getConfig(type).actions

export const getPublicActions = type => getConfig(type).publicActions

export const getCollectionAPI = type => getActions(type).collectionAPI

export const getElementAPI = type => getActions(type).elementAPI

export const getPublicAPI = type => getActions(type).publicAPI

export const getSearchOptions = type => getConfig(type).searchOptions
