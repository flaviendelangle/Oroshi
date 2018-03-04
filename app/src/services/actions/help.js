import { HELP as config } from '../../config'
import { getDetails, cleanDetails } from './publicAPI'
import { element } from '../titles/help'
import { getElementClass } from '../content/collectionTypes'


// eslint-disable-next-line import/prefer-default-export
export const getElement = (type, collection) => {
  const publicId = config.defaultElements[type]
  const Element = getElementClass(type)
  return {
    type: element.loaded,
    payload: getDetails(type, false, collection, publicId).then((response) => {
      const data = {
        local: cleanDetails(type, response),
      }
      return Element.fromDistant(data, collection)
    }),
  }
}
