import fs from 'fs'
import { forwardTo } from 'prisma-binding'

import { prisma } from './config'

// const test = fs.readFileSync(prisma.typeDefs, 'utf8').toString()

const forward = forwardTo('db')

export default {
  Query: {
    directors: forward,
    director: forward,
    movie: forward,
    movies: forward,
  },
  Mutation: {
    createTitle: forward,
    createPoster: forward,
    createMovie: forward,
    createDirector: forward,
    createGenre: forward,
    updateTitle: forward,
    updatePoster: forward,
    updateMovie: forward,
    updateDirector: forward,
    updateGenre: forward,
    deleteTitle: forward,
    deletePoster: forward,
    deleteMovie: forward,
    deleteDirector: forward,
    deleteGenre: forward,
    upsertTitle: forward,
    upsertPoster: forward,
    upsertMovie: forward,
    upsertDirector: forward,
    upsertGenre: forward,
    updateManyTitles: forward,
    updateManyPosters: forward,
    updateManyMovies: forward,
    updateManyDirectors: forward,
    updateManyGenres: forward,
    deleteManyTitles: forward,
    deleteManyPosters: forward,
    deleteManyMovies: forward,
    deleteManyDirectors: forward,
    deleteManyGenres: forward,
  },
}
