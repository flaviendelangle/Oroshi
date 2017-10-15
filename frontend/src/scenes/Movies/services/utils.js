let sortKey = 'title';

export const sort = (movies) => {
  return movies.sort((a, b) => {
    let comparison = 0;
    if(a[sortKey] > b[sortKey]) {
      comparison = 1;
    } else if(a[sortKey] < b[sortKey]) {
      comparison = -1;
    }
    return comparison;
  });
}