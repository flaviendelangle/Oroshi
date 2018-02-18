
class ListGenerator {
  regexp = new RegExp('([a-zA-Z0-9]+):([a-zA-Z0-9]+)')
  query
  results = []
  filters = []

  constructor(data = [], query = '') {
    this.data = data
    this.query = query
    this.analyseQuery()
    this.filter()
  }

  getElementCount = () => this.results.length

  analyseQuery = () => {
    while (this.query.match(this.regexp)) {
      const results = this.regexp.exec(this.query)
      this.query = this.query.replace(results[0], '')

      if (results[2] === 'true') {
        results[2] = true
      } else if (results[2] === 'false') {
        results[2] = false
      } else if (!Number.isNaN(results[2])) {
        results[2] = parseInt(results[2], 10)
      }

      this.filters.push(results)
    }
    this.query = this.clean(this.query)
  }

  clean = string => string.toUpperCase().replace(/\./g, ' ')

  filter = () => {
    const results = this.data.filter(el => el.match(this.query.split(' ')))

    /*
    for (let i=0; i<this.filters.length; i++) {
      const filter = this.filters[i]
      results = results.filter((component) => {
        const movieValue = component[filter[1]]
        const filterValue = filter[2]
        return this.matchFilter(movieValue, filterValue)
      })
    }
    */

    this.results = results
  }

  matchField = (value) => {
    if (Object.prototype.toString.call(value) === '[object String]') {
      return this.clean(value).includes(this.query)
    } else if (!Number.isNaN(value)) {
      return value === parseInt(this.query, 10)
    }
    return false
  }

  matchFilter = (movieValue, filterValue) => movieValue === filterValue
}

export default ListGenerator
