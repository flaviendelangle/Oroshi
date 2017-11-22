import moment from 'moment'
import Papa from 'papaparse'

let date = (date, oldFormat, newFormat) => {
  const newDate = moment(date, oldFormat);
  return newDate.format(newFormat);
};

date.TMDB_FORMAT = 'YYYY-MM-DD';

date.YEAR_FORMAT = 'YYYY';


let parseCSV = (scene, csv) => {
  let { comments, content } = extractComments(csv);
  if (comments.scene !== scene) {
    return {
      error: 'Wrong scene'
    };
  }
  return Papa.parse(content, { header: true, dynamicTyping: true }).data
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
  let content = [];
  csv.split('\n')
    .forEach(el => {
      if(el[0] === '#') {
        el = el.substring(1).split(',');
        comments[el[0]] = el[1];
      } else {
        content.push(el);
      }
    });
  
  return {
    comments,
    content: content.join('\n')
  };
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