import { merge } from 'lodash'

import { pickElement, getLanguage } from '../languages'


class Element {
  local = null
  distant = null
  $isInCollection = false

  searchIndex = []

  constructor(localData, distantData) {
    this.setLocal(localData)
    this.setDistant(distantData)
  }

  static fromDistantList(data, collection, ChildClass) {
    const { content, ...clearedCollection } = collection
    const elements = data.map((el) => {
      const newElement = new ChildClass(el.local, el.distant)
      newElement.setInCollection(el.in_collection)
      return newElement
    })
    elements.forEach(el => el.setCollection(clearedCollection))
    return elements
  }

  static fromDistant(data, collection, ChildClass) {
    const { content, ...clearedCollection } = collection
    const element = new ChildClass(data.local, data.distant)
    element.setCollection(clearedCollection)
    return element
  }

  static sortList(_elements, params) {
    const elements = [..._elements]
    const mul = params.direction === 'asc' ? 1 : -1
    return elements.sort((a, b) => a.isGreater(b, params.field) * mul)
  }

  static buildAutoComplete(elements, streamKey = { field: 'directors' }) {
    const indexes = {
      grid: [],
      stream: [],
    }
    elements.forEach((el) => {
      el.searchIndex_raw
        .forEach((str) => {
          if (!indexes.grid.includes(str)) {
            indexes.grid.push(str)
          }
        })
      el.getValue(streamKey.field)
        .forEach((value) => {
          const { name } = value
          if (!indexes.stream.includes(name)) {
            indexes.stream.push(name)
          }
        })
    })
    return {
      grid: indexes.grid.sort(),
      stream: indexes.stream.sort(),
    }
  }

  static createFieldListGenerator(field) {
    return Element.buildFieldList.bind(null, field)
  }

  static buildFieldList(field, elements) {
    const list = elements.reduce((result, element) => (
      [...result, ...element.getValueFlat(field)]
    ), [])
    return [...new Set(list)].sort()
  }

  buildSearchIndex(searchIndex = []) {
    const local = this.getLocal()

    local.titles.forEach(el => searchIndex.push(el.title))
    local.genres.forEach(el => searchIndex.push(el.name))

    const language = getLanguage(local.original_language)
    if (language) {
      searchIndex.push(language.name)
    }
    this.searchIndex_raw = searchIndex
    this.searchIndex = searchIndex.map(el => el.toUpperCase())
  }

  getSearchIndex = () => this.searchIndex

  getLocal = () => this.local

  hasLocal = () => !!this.local

  setLocal(newLocal) {
    this.local = newLocal
    if (this.hasLocal()) {
      this.buildSearchIndex()
    }
  }

  editLocal(editValues) {
    const newLocal = merge(this.getLocal(), editValues)
    this.setLocal(newLocal)
  }

  isGreater(other, field, primary = true) {
    const valueA = this.getValueToSort(field)
    const valueB = other.getValueToSort(field)
    if (valueA > valueB) {
      return 1
    }
    if (valueA < valueB) {
      return -1
    }
    if (!primary) {
      return 0
    }
    if (field !== 'note') {
      return this.isGreater(other, 'note', false)
    }
    return -this.isGreater(other, 'title', false)
  }

  isInCollection = () => this.$isInCollection

  setInCollection = (isInCollection) => {
    this.$isInCollection = isInCollection
  }


  getDistant = () => this.distant

  hasDistant = () => !!this.distant

  setDistant = (newPublic) => {
    this.distant = newPublic
  }

  getCollection = () => this.collection

  setCollection = (newCollection) => {
    this.collection = newCollection
  }

  getValue(field) {
    return this.local[field]
  }

  getValueFlat(field) {
    const value = this.getValue(field)
    if (field === 'genres') {
      return value.map(el => el.name)
    }
    return value
  }

  getValueToSort(field) {
    if (field === 'title') {
      return this.getTitle().replace(/ /g, '').toLowerCase()
    }
    if (field === 'note') {
      const note = this.getNote()
      return note || 0
    }
    if (this.hasLocal()) {
      return this.getLocal()[field]
    }
    return this.getDistant()[field]
  }

  getID = () => this.getLocal().pk

  getPublicId = () => {
    if (this.hasDistant()) {
      return this.getDistantPublicID()
    }
    return this.getLocalPublicID()
  }

  getNote = () => {
    if (this.hasDistant()) {
      return this.getDistant().vote_average
    }
    return this.getLocal().note
  }

  getTitle = (_language) => {
    if (this.hasLocal()) {
      const language = _language || this.getCollection().title_language
      return pickElement(this.getLocal(), 'titles', 'title', language)
    }
    return this.getDistantTitle()
  }

  getPosterPath = (_language) => {
    if (this.hasLocal()) {
      const language = _language || this.getCollection().poster_language
      return pickElement(this.getLocal(), 'posters', 'path', language)
    }
    return this.getDistant().poster_path
  }

  match = (query) => {
    if (
      query.length === 1 &&
      query[0] === ''
    ) {
      return true
    }
    const match = query
      .map(queryWord => this.getSearchIndex().find(word => word.includes(queryWord)))
      .filter(el => !!el)
    return match.length === query.length
  }
}

export default Element
