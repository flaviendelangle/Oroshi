import { setValue, getValue } from 'services/localstorage';

export const sortElements = (elements, params) => {
  
  const field = params.field;
  const mul = params.direction === 'asc' ? 1 : -1;
  elements = elements.sort((a, b) => {
    
    return a.isGreater(b, field)*mul;
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
