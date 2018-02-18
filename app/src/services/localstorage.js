const localStorageKey = 'application_settings'

const getLocalStorage = () => {
  const rawData = localStorage.getItem(localStorageKey)
  if (!rawData) {
    return {}
  }
  try {
    return JSON.parse(rawData)
  } catch (e) {
    return {}
  }
}

const setLocalStorage = (state) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state))
}

export const getValue = (key) => {
  const state = getLocalStorage()
  return state[key]
}

export const setValue = (key, value) => {
  const state = getLocalStorage()
  state[key] = value
  setLocalStorage(state)
}

export const destroyValue = (key) => {
  const state = getLocalStorage()
  delete state[key]
  setLocalStorage(state)
}

export const loadOauth = () => getValue('oauth')

export const destroyOauth = () => destroyValue('oauth')

export const saveOauth = (oauth, meta) => {
  const exData = loadOauth()
  let data
  if (!meta && exData) {
    data = {
      oauth,
      meta: exData.meta,
    }
  } else {
    data = {
      oauth,
      meta,
    }
  }
  setValue('oauth', data)
}

