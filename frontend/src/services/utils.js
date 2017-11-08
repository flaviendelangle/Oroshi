import moment from 'moment'
import Papa from 'papaparse'

import { movies } from './actions/titles/data'

let date = (date, oldFormat, newFormat) => {
  const newDate = moment(date, oldFormat);
  return newDate.format(newFormat);
};

date.TMDB_FORMAT = 'YYYY-MM-DD';

date.YEAR_FORMAT = 'YYYY';


let parseDump = csv => {
  return Papa.parse(csv, { header: true, dynamicTyping: true }).data
    .map(line => {
      let newLine = {};
      for(const field in line) {
        if(line.hasOwnProperty(field)) {
          const newField = unCapitalize(field);
          newLine[newField] = line[field];
        }
      }
      return newLine;
    });
};

let unCapitalize = (field) => {
  return field.charAt(0).toLowerCase() + field.slice(1);
};

let getTitles = (type) => {
  switch(type) {
    case 'movies':
      return movies;
    default:
      return null;
  }
};





export { date, parseDump, getTitles };