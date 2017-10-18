import moment from 'moment'

let sortKey = 'title';

const sort = (movies) => {
  return movies.sort((a, b) => {
    let comparison = 0;
    if(a[sortKey] > b[sortKey]) {
      comparison = 1;
    } else if(a[sortKey] < b[sortKey]) {
      comparison = -1;
    }
    return comparison;
  });
};

let date = (date, oldFormat, newFormat) => {
  const newDate = moment(date, oldFormat);
  return newDate.format(newFormat);
};

date.TMDB_FORMAT = 'YYYY-MM-DD';

date.YEAR_FORMAT = 'YYYY';


export { sort, date }