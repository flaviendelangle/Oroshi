let parameters = {
  field: 'title',
  direction: 'asc'
};


export const sort = movies => {
  movies = movies.sort((a, b) => {
    let comparison = 0;
    const key = parameters.field;
    const mul = parameters.direction === 'asc' ? -1 : 1;
    if(a[key] > b[key])
      comparison = mul;
    else if(a[key] < b[key])
      comparison = -1 * mul;
    return comparison;
  });
  return movies;
};

export const setSortParameters = params => {
  parameters = params;
};