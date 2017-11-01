import { setValue } from '../../../services/localstorage'

export const sort = (movies, params) => {
  movies = movies.sort((a, b) => {
    let comparison = 0;
    const key = params.field;
    const mul = params.direction === 'asc' ? 1 : -1;
    if(a[key] > b[key])
      comparison = mul;
    else if(a[key] < b[key])
      comparison = -1 * mul;
    return comparison;
  });
  return movies;
};

export const setSortParameters = params => {
  setValue('order', params);
};

export const setLayoutParameters = params => {
  setValue('layout', params);
};