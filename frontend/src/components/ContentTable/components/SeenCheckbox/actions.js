import { updateMovieInCollection } from '../../../../scenes/CollectionMovies/actions'

export const update = (data, type) => {
  const clearedData = {
      seen: !data.seen
  };
  switch(type){
    case 'collection_movies':
      return updateMovieInCollection(data.collection, data.pk, clearedData);
    default:
      return null;
  }
};