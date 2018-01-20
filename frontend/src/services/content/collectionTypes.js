import { collectionTypes } from "appConfig";

export const getConfig = (scene) => {
  return collectionTypes.find((el) => el.name === scene);
};

export const getActions = (type) => {
  return getConfig(type).actions;
};

export const getPublicActions = (type) => {
  return getConfig(type).publicActions;
};

export const getCollectionAPI = (type) => {
  return getActions(type).collectionAPI;
};

export const getElementAPI = (type) => {
  return getActions(type).elementAPI;
};

export const getPublicAPI = (type) => {
  return getActions(type).publicAPI;
};

