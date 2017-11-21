import moment from 'moment'
import Papa from 'papaparse'

let date = (date, oldFormat, newFormat) => {
  const newDate = moment(date, oldFormat);
  return newDate.format(newFormat);
};

date.TMDB_FORMAT = 'YYYY-MM-DD';

date.YEAR_FORMAT = 'YYYY';


let parseCSV = (scene, csv) => {
  let comments = extractComments(csv);
  if (comments.scene !== scene) {
    return {
      error: 'Wrong scene'
    };
  }
  return Papa.parse(csv, { header: true, dynamicTyping: true }).data
    .map(line => {
      let newLine = {};
      for(const field in line) {
        if (line.hasOwnProperty(field)) {
          newLine[field] = line[field];
        }
      }
      return newLine;
    })
    .sort((a,b) => {
      return a.title > b.title ? 1 : -1;
    });
};

const extractComments = csv => {
  let comments = {};
  csv.split('\n')
    .filter(el => el[0] === '#')
    .forEach(el => {
      el = el.substring(1).split(',');
      comments[el[0]] = el[1];
    });
  return comments;
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