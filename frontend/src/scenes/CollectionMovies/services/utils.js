import { getValue, setValue } from '../../../services/localstorage'


const localSortParameters = getValue('order');
const defaultSortParameters = {
  field: 'title',
  direction: 'asc'
};

let sortParameters = localSortParameters || defaultSortParameters;


export const sort = movies => {
  movies = movies.sort((a, b) => {
    let comparison = 0;
    const key = sortParameters.field;
    const mul = sortParameters.direction === 'asc' ? 1 : -1;
    if(a[key] > b[key])
      comparison = mul;
    else if(a[key] < b[key])
      comparison = -1 * mul;
    return comparison;
  });
  return movies;
};

export const setSortParameters = params => {
  sortParameters = params;
  setValue('order', params);
};

export const setLayoutParameters = params => {
  setValue('layout', params);
};