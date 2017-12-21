import { collectionTypes } from "appConfig";

export const getConfig = scene => {
  return collectionTypes.find(el => el.name === scene);
};

export const getActions = scene => {
  return getConfig(scene).actions;
};

export const getPublicActions = scene => {
  return getConfig(scene).publicActions;
};

export const getCollectionAPI = scene => {
  return getActions(scene).collectionAPI;
};

export const getElementAPI = scene => {
  return getActions(scene).elementAPI;
};

export const getPublicAPI = scene => {
  return getActions(scene).publicAPI;
};

