import json2csv from 'json2csv'
import downloadjs from 'downloadjs'

import { _loadCollection } from '../../../../services/actions/api'
import { prepareMovies } from '../../services/utils'
import { collections } from '../../../../services/actions/titles/exports'

const collectionFields = ['title', 'release', 'directors', 'seen'];

export const exportAsCSV = pk => {
  return {
    type: collections.csv,
    payload: _loadCollection(pk).payload.then(response => {
      response = prepareMovies(response);
      const movies = response.movies.map(el => {
        return {
          title: el.title,
          release: el.release,
          directors: el.directors.map(director => director.name).join(', '),
          seen: el.seen
        }
      });
      const csv = json2csv({ data: movies, fields: collectionFields });
      downloadjs(csv, response.title, 'text/csv');
      return null;
    })
  }
};