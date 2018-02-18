import { setValue, getValue } from 'services/localstorage'


export const setSortParameters = (type, params, defaultOrder) => {
  const key = `order_${type}`
  const oldParams = getValue(key) || defaultOrder
  oldParams[params.layout] = params
  setValue(key, oldParams)
}

export const setLayoutParameters = (type, params) => {
  const key = `layout_${type}`
  setValue(key, params)
}
