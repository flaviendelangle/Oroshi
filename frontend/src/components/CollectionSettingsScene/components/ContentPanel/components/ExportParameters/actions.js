import json2csv from 'json2csv'
import downloadjs from 'downloadjs'

import { get as getCollection } from 'services/actions/collections/index'
import { collections } from 'services/titles/exports'

const collectionFields = ['TmdbId', 'Title', 'Release', 'Directors', 'Genres', 'Seen', 'Note'];

export const exportAsCSV = pk => {
  return {
    type: collections.csv,
    payload: getCollection('movies', pk).payload.then(response => {
      const content = response.content.map(el => {
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
      const csv = json2csv({ data: content, fields: collectionFields });
      downloadjs(csv, response.title + '.csv', 'text/csv');
      return null;
    })
  }
};