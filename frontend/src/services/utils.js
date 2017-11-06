import moment from 'moment'

let date = (date, oldFormat, newFormat) => {
  const newDate = moment(date, oldFormat);
  return newDate.format(newFormat);
};

date.TMDB_FORMAT = 'YYYY-MM-DD';

date.YEAR_FORMAT = 'YYYY';


let parseDump = csv => {
  
  const lines=csv.split("\n");
  let result = [];
  const headers = lines[0]
    .replace(/"/g, '')
    .split(",")
    .map(el => {
      return el.charAt(0).toLowerCase() + el.slice(1);
    });
  
  for(let i=1;i<lines.length;i++){
    let obj = {};
    const currentLine = lines[i].split(",");
    
    for(let j=0;j<headers.length;j++){
      let value = currentLine[j].replace(/"/g, '');
      obj[headers[j]] = value;
    }
    
    result.push(obj);
  }
  return result;
};

let extractIdsFromDump = csv => {
  return parseDump(csv).map(el => {
    return parseInt(el.TmdbId, 10);
  })
};




export { date, parseDump, extractIdsFromDump };