import Papa from 'papaparse'

const extractComments = (csv) => {
  let comments = {};
  const content = [];
  csv.split('\n')
    .forEach((_el) => {
      if (_el[0] === '#') {
        const data = _el.substring(1).split(',');
        comments = {
          ...comments,
          [data[0]]: data[1],
        };
      } else {
        content.push(_el);
      }
    });

  return {
    comments,
    content: content.join('\n'),
  };
};

const parseJSON = (scene, json) => {
  const { comments, content } = JSON.parse(json);
  if (comments.scene !== scene) {
    return {
      error: 'Wrong scene',
    };
  }
  return content.sort((a, b) => (a.title > b.title ? 1 : -1));
};

const parseCSV = (scene, csv) => {
  const { comments, content } = extractComments(csv);
  if (comments.scene !== scene) {
    return {
      error: 'Wrong scene',
    };
  }
  return Papa.parse(content, { header: true, dynamicTyping: true }).data
    .map((line) => {
      const newLine = {};
      Object.keys(line).forEach((field) => {
        newLine[field] = line[field];
      });
      return newLine;
    })
    .sort((a, b) => (a.title > b.title ? 1 : -1));
};

export const getCollectionTypeTitle = (type) => {
  switch (type) {
    case 'movies':
      return 'Movies';
    case 'tv_shows':
      return 'TV Shows';
    default:
      return '';
  }
};

export { parseCSV, parseJSON };
