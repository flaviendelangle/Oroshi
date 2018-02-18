import { readAsText } from 'promise-file-reader'
import json2csv from 'json2csv'
import downloadjs from 'downloadjs'

import { getActions, getCollectionAPI } from "services/content/collectionTypes"
import { parseCSV, parseJSON } from 'services/utils'
import { pickElement } from 'services/languages'
import { CollectionsAPI } from 'services/api/collections'
import { checkExistence } from 'services/actions/publicAPI'
import * as titles from 'services/titles/api'
import { collections } from 'services/titles/exports'


/*
  ACTIONS WITHOUT DISPATCH
 */
export const addSeenToElements = (type, elements, seen) => (
  getActions(type).addSeenToElements(elements, seen)
)

export const addCollectionToElement = (element, collection) => {
  return {
    ...element,
    collection,
  }
}

export const prepareElements = (type, data) => {
  const { content, seen, ...clearedData } = data
  const Element = getActions(type).elementClass
  const elements = content.map(el => new Element(el))
  elements.forEach((el) => {
    el.setCollection(clearedData)
    getActions(type).prepareElement(el, seen)
  })

  return {
    ...data,
    content: elements,
  }
}


/*
  ACTIONS WITH DISPATCH
 */
export const create = (type, data) => ({
  type: titles.collectionContent.create,
  payload: getCollectionAPI(type).create(data),
  meta: {
    type,
  },
})

export const destroy = (type, pk) => ({
  type: titles.collections.destroy,
  payload: getCollectionAPI(type).destroy(pk),
})

export const get = (type, collection) => ({
  type: titles.collectionContent.load,
  payload: getCollectionAPI(type).retrieve(collection.pk)
    .then(response => prepareElements(type, response))
    .catch((error) => {
      console.error(error.toString())
      return undefined
    }),
  meta: {
    type,
    collection,
  },
})

export const getAll = pk => ({
  type: titles.collectionContent.loadAllSettings,
  payload: CollectionsAPI.settings(pk),
})

export const getSettings = (type, collection) => ({
  type: titles.collectionContent.loadSettings,
  payload: getCollectionAPI(type).settings(collection.pk),
  meta: {
    type,
    collection,
  },
})

export const getSuggestions = (type, collection, publicId) => ({
  type: titles.collectionContent.loadSuggestions,
  payload: getActions(type).getSuggestions(type, collection, publicId),
  meta: {
    type,
    collection,
  },
})

export const update = (type, pk, data) => ({
  type: titles.collections.updateSettings,
  payload: getCollectionAPI(type).partialUpdate(pk, data),
})

export const addElement = (type, collection, element) => ({
  type: titles.collections.add,
  payload: getActions(type).addElement(type, collection, element),
  meta: {
    type,
    collection,
  },
})

export const updateElement = (type, element, data, field) => {
  const collection = element.getCollection()
  const pk = element.getID()
  return {
    type: titles.collections.update,
    payload: getCollectionAPI(type)
      .element(collection.pk)[type]
      .partialUpdate(pk, data)
      .then(() => {
        element.editLocal(data)
        return element
      }),
    meta: {
      type,
      collection,
      field,
    },
  }
}

export const removeElement = (type, collection, element) => {
  const api = getCollectionAPI(type).element(collection.pk)[type]
  return {
    type: titles.collections.remove,
    payload: api.destroy(element.getID()).then(() => {
      element.setInCollection(false)
      return element
    }),
    meta: {
      type,
      collection,
    },
  }
}

export const importCSV = (type, collection, file) => ({
  type: titles.collectionContent.importFromFile,
  payload: readAsText(file).then(result => ({
    data: parseCSV(type, result),
    format: 'csv',
  })),
  meta: {
    type,
    collection,
  },
})

export const importJSON = (type, collection, file) => ({
  type: titles.collectionContent.importFromFile,
  payload: readAsText(file).then(result => ({
    data: parseJSON(type, result),
    format: 'json',
  })),
  meta: {
    type,
    collection,
  },
})

export const importElements = (type, collection, _elements, dispatch) => {
  const importElement = (elements, index) => {
    if (elements.length <= index) {
      dispatch({
        type: `${titles.collectionContent.import}_FULFILLED`,
      })
      return true
    }
    const element = elements[index]
    if (element.isInCollection()) {
      setTimeout(() => importElement(elements, index + 1))
      return dispatch({
        type: titles.collections.add,
        payload: element,
        meta: {
          type,
          collection,
        },
      })
    }
    return addElement(type, collection, element).payload.then((el) => {
      dispatch({
        type: titles.collections.add,
        payload: el,
        meta: {
          type,
          collection,
        },
      })
      importElement(elements, index + 1)
    })
  }

  const data = {
    results: _elements,
  }

  return {
    type: titles.collectionContent.importElement,
    payload: checkExistence(type, collection, data, true).then(({ results }) => {
      const Element = getActions(type).elementClass
      const elements = Element.fromDistantList(results, collection)
      dispatch({
        type: `${titles.collectionContent.import}_STARTED`,
        data: elements,
      })
      importElement(elements, 0)
    }),
    meta: {
      type,
      collection,
    },
  }
}

const getDataToExport = (type, collection) => (
  get(type, collection).payload.then((data) => {
    const fields = getActions(type).exportFields
    const content = data.content.map((el) => {
      const data = {}
      const values = el.getLocal()
      fields.forEach((field) => {
        if (field === 'title') {
          data[field] = pickElement(values, 'titles', 'title', data.title_language)
        } else {
          data[field] = values[field]
        }
      })
      return data
    })
    return {
      data,
      fields,
      content,
    }
  })
)

const exportAsCSV = (type, collection) => {
  const generateComments = () => `#type, ${type}\n`
  return {
    type: collections.csv,
    payload: getDataToExport(type, collection).then(({ fields, content, data }) => {
      const csv = json2csv({ data: content, fields })
      const comments = generateComments()
      downloadjs(comments + csv, `${data.title}.csv`, 'text/csv')
      return null
    }),
  }
}

const exportAsJSON = (type, collection) => ({
  type: collections.json,
  payload: getDataToExport(type, collection).then(({ content, data }) => {
    const comments = {
      type,
    }
    const json = JSON.stringify({
      comments,
      content,
    })
    downloadjs(json, `${data.title}.json`, 'text/json')
  }),
})

export const exportCollection = (type, collection, format) => {
  switch (format) {
    case 'csv':
      return exportAsCSV(type, collection)
    case 'json':
      return exportAsJSON(type, collection)
    default:
      return null
  }
}
