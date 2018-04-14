import * as titles from '../titles/interface'
import { sort } from '../titles/data'

import { getLineDimensions } from '../interface'

export const alertScreenResize = () => ({
  type: titles.screen.resize,
  width: window.innerWidth,
  height: window.innerHeight,
  lineDimensions: getLineDimensions(window.innerWidth),
})

export const removeSnack = (type, collection) => ({
  type: titles.snacks.remove,
  meta: {
    type,
    collection,
  },
})

export const cleanElementSuggestions = (type, collection) => ({
  type: titles.elementSuggestions.clean,
  meta: {
    type,
    collection,
  },
})

export const showDialogCreateCollection = show => ({
  type: titles.dialogs.createCollection,
  show,
})

export const showMainDrawer = (type, collection, show) => ({
  type: titles.drawers.main,
  show,
  meta: {
    type,
    collection,
  },
})

export const switchCollectionLayout = (type, collection, newLayout) => ({
  type: titles.layout.update,
  layout: newLayout,
  meta: {
    type,
    collection,
  },
})

export const sortCollectionContent = (type, collection, layout, field, direction) => ({
  type: sort.update,
  parameters: { layout, field, direction },
  meta: {
    type,
    collection,
  },
})
