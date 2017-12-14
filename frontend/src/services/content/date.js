import moment from "moment/moment";

let date = (dateString, oldFormat, newFormat) => {
  const newDate = moment(dateString, oldFormat);
  return newDate.format(newFormat);
};

date.getTimestamp = (dateString, format) => {
  const newDate = moment(dateString, format);
  return newDate.format("X");
};

date.isAfter = (date_A, date_B, format) => {
  date_A = moment(date_A, format);
  date_B = moment(date_B, format);
  return date_A.isAfter(date_B);
};

date.TMDB_FORMAT = 'YYYY-MM-DD';

date.YEAR_FORMAT = 'YYYY';


export default date;