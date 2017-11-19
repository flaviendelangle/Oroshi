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

export const mergeRecommendations = (recommendations, newData, type) => {
  const oldData = recommendations.results.filter(el => el.type === type)[0];
  newData.content = oldData.content.concat(newData.content);
  const data = [
    ...recommendations.results.filter(el => el.type !== type),
    newData
  ];
  return {
    ...recommendations,
    results: data
  };
};

export const mergeSearch = (oldData, newData) => {
  if(!oldData || newData.page === 1) {
    return newData;
  }
  return {
    ...newData,
    results: oldData.results.concat(newData.results)
  }
};

export const updateRecommendations = (recommendations, action) => {
  const tmdbId = action.payload.tmdbId;
  console.log(tmdbId);
  let newResults = [];
  for(let i=0; i<recommendations.results.length; i++) {
    const newContent = recommendations.results[i].content.map(el => {
      if(el.id === tmdbId) {
        return {
          ...el,
          already_in_collection: false
        };
      }
      return el;
    });
    newResults.push({
      ...recommendations.results[i],
      content: newContent
    });
  }
  return {
    ...recommendations,
    results: newResults
  };
};