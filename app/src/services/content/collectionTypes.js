import { collectionTypes } from '../../config'

export const getAllTypes = () => collectionTypes.map(el => el.name)

export const getConfig = type => collectionTypes.find(el => el.name === type)


/*
  BASIC DATA
 */
export const getStatus = type => getConfig(type).status || 'ready_to_use'

export const getIcon = type => getConfig(type).icon

export const getLabel = type => getConfig(type).label


/*
  ACTIONS
 */
export const getActions = type => getConfig(type).actions

export const getPublicActions = type => getConfig(type).publicActions


/*
  API
 */
export const getCollectionAPI = type => getActions(type).collectionAPI

export const getElementAPI = type => getActions(type).elementAPI

export const getPublicAPI = type => getActions(type).publicAPI


/*
  CONTENT MANAGERS
 */
export const getListGenerator = type => getConfig(type).listGenerator

export const getStreamGenerator = type => getConfig(type).streamGenerator


/*
  OPTIONS
 */
export const getSearchOptions = type => getConfig(type).searchOptions

export const getSortOptions = type => getConfig(type).sortOptions
