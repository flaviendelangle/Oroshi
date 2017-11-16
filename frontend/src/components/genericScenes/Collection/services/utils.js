import { setValue, getValue } from 'services/localstorage';

export const sortElements = (elements, params) => {
  elements = elements.sort((a, b) => {
    let comparison = 0;
    const key = params.field;
    const mul = params.direction === 'asc' ? 1 : -1;
    if(a[key] > b[key])
      comparison = mul;
    else if(a[key] < b[key])
      comparison = -1 * mul;
    return comparison;
  });
  return elements;
};

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