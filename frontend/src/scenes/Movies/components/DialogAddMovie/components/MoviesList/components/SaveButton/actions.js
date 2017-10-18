import { addMovieToCollection } from '../../../../../../actions'


export const saveMovie = data => {
    return addMovieToCollection(data);
};