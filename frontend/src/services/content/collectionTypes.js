import { collectionTypes } from "appConfig";

export const getConfig = scene => {
  return collectionTypes.find(el => el.name === scene);
};