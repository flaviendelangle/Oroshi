import { getCollectionAPI, getElementAPI, getActions, getPublicActions } from 'services/content/collectionTypes'
import { getDetails, cleanDetails, getTitle, getPoster } from 'services/actions/publicAPI'
import { getMissingLanguages } from 'services/languages'

const createMissingData = (type, { collection, local }) => {
  if (!local) {
    return Promise.resolve()
  }

  const languages = getMissingLanguages(collection, local)
  const localAPI = getElementAPI(type)

  const createTitle = (i) => {
    if (i < languages.title.length) {
      return getTitle(type, local.tmdbId, languages.title[i])
        .then(title => localAPI.addTitle(local.pk, languages.title[i], title))
        .then(() => createTitle(i + 1))
    }
    return Promise.resolve({})
  }

  const createPoster = (i) => {
    if (i < languages.poster.length) {
      return getPoster(type, local.tmdbId, languages.poster[i])
        .then((poster = '') => (
          localAPI.addPoster(local.pk, languages.poster[i], poster)
        ))
        .then(() => createPoster(i + 1))
    }
    return Promise.resolve()
  }

  return createTitle(0).then(() => createPoster(0))
}

export const addElement = (type, collection, element) => {
  let promise
  let details
  const seen = element.hasBeenSeen()
  if (element.hasLocal()) {
    promise = Promise.resolve({
      collection,
      local: element.getLocal(),
    })
  } else {
    promise = getDetails(type, false, collection, element.getPublicId())
      .then((response) => {
        details = response
        const cleanedDetails = cleanDetails(type, details)
        return getElementAPI(type).create(cleanedDetails)
      })
      .then((local) => {
        element.setLocal(local)
        return {
          collection,
          local,
        }
      })
  }

  const localAPI = getCollectionAPI(type)
  return promise
    .then(response => createMissingData(type, response))
    .then(() => {
      const data = {
        pk: element.getID(),
        seen,
      }
      return localAPI.element(collection.pk)[type].create(data)
    })
    .then((newLocal) => {
      element.setLocal(newLocal)
      element.setInCollection(true)
      return element
    })
}

export const getSuggestions = (type, collection, tmdbId) => (
  getPublicActions(type).getDetails(type, collection, tmdbId).then((response) => {
    const Element = getActions(type).elementClass
    const data = {
      distant: response,
      local: getPublicActions(type).cleanDetails(type, response),
    }
    const element = Element.fromDistant(data, collection)
    return getPublicActions(type).getSuggestions(type, collection, element)
  })
)
