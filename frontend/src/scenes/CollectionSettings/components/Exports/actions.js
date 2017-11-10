import json2csv from 'json2csv'
import downloadjs from 'downloadjs'

import { _loadCollection } from 'services/actions/api'
import { collections } from 'services/titles/exports'
import { prepareElements } from '../../services/utils'

const collectionFields = ['TmdbId', 'Title', 'Release', 'Directors', 'Genres', 'Seen', 'Note'];

export const exportAsCSV = pk => {
  return {
    type: collections.csv,
    payload: _loadCollection('movies', pk).payload.then(response => {
      response = prepareElements('movies', response);
      const movies = response.movies.map(el => {
        return {
          TmdbId: el.tmdbId,
          Title: el.title,
          Release: el.release,
          Directors: el.directors.map(director => director.name).join(', '),
          Genres: el.genres.map(genre => genre.name).join(', '),
          Seen: el.seen,
          Note: el.note
        }
      });
      const csv = json2csv({ data: movies, fields: collectionFields });
      downloadjs(csv, response.title + '.csv', 'text/csv');
      return null;
    })
  }
};