import { collectionTypes } from "appConfig";


export const getConfig = scene => collectionTypes.find(el => el.name === scene);

export const getActions = type => getConfig(type).actions;

export const getPublicActions = type => getConfig(type).publicActions;

export const getCollectionAPI = type => getActions(type).collectionAPI;

export const getElementAPI = type => getActions(type).elementAPI;

export const getPublicAPI = type => getActions(type).publicAPI;

