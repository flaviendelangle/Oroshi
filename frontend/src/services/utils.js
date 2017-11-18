import moment from 'moment'
import Papa from 'papaparse'

let date = (date, oldFormat, newFormat) => {
  const newDate = moment(date, oldFormat);
  return newDate.format(newFormat);
};

date.TMDB_FORMAT = 'YYYY-MM-DD';

date.YEAR_FORMAT = 'YYYY';


let parseCSV = csv => {
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
    })
    .sort((a,b) => {
      return a.title > b.title ? 1 : -1;
    });
};

let unCapitalize = (field) => {
  return field.charAt(0).toLowerCase() + field.slice(1);
};

export const getCollectionTypeTitle = type => {
  switch(type) {
    case 'movies':
      return 'Movies';
    case 'tv_shows':
      return 'TV Shows';
    default:
      return '';
  }
};




export { date, parseCSV };