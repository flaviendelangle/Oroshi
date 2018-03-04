import { isBoolean } from 'lodash'

import { path } from '../../services/TheMovieDatabaseJS/images'

import Element from '../../services/content/element'
import date from '../../services/content/date'


class Movie extends Element {
  static fromDistantList(data, collection) {
    return super.fromDistantList(data, collection, Movie)
  }

  static fromDistant(data, collection) {
    return super.fromDistant(data, collection, Movie)
  }

  static fromSettings(collection) {
    return super.fromSettings(collection, Movie)
  }

  buildSearchIndex() {
    const local = this.getLocal()
    const searchIndex = []

    local.directors.forEach(el => searchIndex.push(el.name))
    searchIndex.push(this.getReleaseYear())

    super.buildSearchIndex(searchIndex)
  }

  isGreater = (other, field) => {
    if (field === 'release') {
      const dateA = this.getValueToSort(field)
      const dateB = other.getValueToSort(field)
      const isAfter = date.isAfter(dateA, dateB, date.TMDB_FORMAT)
      return isAfter ? 1 : -1
    }
    return super.isGreater(other, field)
  }

  getValue = (field) => {
    if (field === 'release_year') {
      const newDate = this.getReleaseYear()
      return [{
        pk: parseInt(newDate, 10),
        name: newDate,
      }]
    }
    return super.getValue(field)
  }

  getValueFlat = (field) => {
    const value = this.getValue(field)
    if (field === 'directors') {
      return value.map(el => el.name)
    }
    return super.getValueFlat(field)
  }

  getLocalPublicID = () => this.getLocal().tmdbId

  getDistantPublicID = () => this.getDistant().id

  getDistantTitle = () => this.getDistant().title

  getFullPosterPath = language => `${path}/w185/${this.getPosterPath(language)}`

  getReleaseDate() {
    if (this.hasDistant()) {
      const rawDate = this.getDistant().release_date
      return date(rawDate, date.TMDB_FORMAT, date.YEAR_FORMAT)
    }
    const { release } = this.getLocal()
    if (Array.isArray(release)) {
      return parseInt(release[0].name, 10)
    }
    return release
  }

  getReleaseYear() {
    return date.getYear(this.getReleaseDate())
  }

  getDirectors = () => {
    if (this.hasLocal()) {
      return this.getLocal().directors
    }
    return []
  }

  hasBeenSeen = () => {
    if (this.hasLocal()) {
      const local = this.getLocal()
      if (Object.prototype.hasOwnProperty.call(local, 'seen')) {
        return this.getLocal().seen
      }
    }
    if (this.hasDistant()) {
      const distant = this.getDistant()
      if (Object.prototype.hasOwnProperty.call(distant, 'seen')) {
        return distant.seen
      }
      return false
    }
    return false
  }

  setSeen = (seen) => {
    this.local.seen = seen
  }

  matchSearchRequest = (request) => {
    if (
      isBoolean(request.seen) &&
      this.hasBeenSeen() !== request.seen
    ) {
      return false
    }
    if (
      request.directors &&
      request.directors.length > 0 &&
      !this.getDirectors().find(el => request.directors.includes(el.name))
    ) {
      return false
    }
    if (
      request.years &&
      request.years.length > 0 &&
      !request.years.includes(String(this.getReleaseYear()))
    ) {
      return false
    }
    return super.matchSearchRequest(request)
  }
}

export default Movie
