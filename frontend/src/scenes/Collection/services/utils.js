import { setValue, getValue } from 'services/localstorage';

export const setSortParameters = (scene, params, defaultOrder) => {
  const key = 'order_' + scene;
  let oldParams = getValue(key) || defaultOrder;
  oldParams[params.layout] = params;
  setValue(key, oldParams);
};

export const setLayoutParameters = (scene, params) => {
  const key = 'layout_' + scene;
  setValue(key, params);
};
