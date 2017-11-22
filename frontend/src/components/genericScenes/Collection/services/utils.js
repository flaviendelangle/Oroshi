import { setValue, getValue } from 'services/localstorage';

export const sortElements = (elements, params) => {
  elements = elements.sort((a, b) => {
    
    let comparison = 0;
    const field = params.field;
    const mul = params.direction === 'asc' ? 1 : -1;
    const valueA = a.getValue(field);
    const valueB = b.getValue(field);
    
    if (valueA > valueB)
      comparison = mul;
    else if (valueA < valueB)
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
