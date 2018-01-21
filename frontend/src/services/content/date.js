import moment from "moment/moment";


const date = (dateString, oldFormat, newFormat) => {
  const newDate = moment(dateString, oldFormat);
  return newDate.format(newFormat);
};

date.getTimestamp = (dateString, format) => {
  const newDate = moment(dateString, format);
  return newDate.format('X');
};

date.isAfter = (_dateA, _dateB, format) => {
  const dateA = moment(_dateA, format);
  const dateB = moment(_dateB, format);
  return dateA.isAfter(dateB);
};

date.getYear = _date => _date.split('-')[0];

date.TMDB_FORMAT = 'YYYY-MM-DD';

date.YEAR_FORMAT = 'YYYY';

export default date;
