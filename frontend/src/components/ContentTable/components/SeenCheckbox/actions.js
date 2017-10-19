import { updateCollectionMovie } from '../../../../scenes/Movies/actions'

export const update = (data, type) => {
  const clearedData = {
      seen: !data.seen
  };
  switch(type){
    case 'collection_movies':
      return updateCollectionMovie(data.collection, data.pk, clearedData);
    default:
      return null;
  }
};