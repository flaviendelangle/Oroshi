const localStorageKey = 'application_settings';

const getLocalStorage = () => {
  const rawData = localStorage.getItem(localStorageKey);
  if (!rawData) {
    return {};
  }
  try {
    return JSON.parse(rawData);
  } catch(e) {
    return {};
  }
};

const setLocalStorage = state => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

export const getValue = key => {
  const state = getLocalStorage();
  return state[key];
};

export const setValue = (key, value) => {
  const state = getLocalStorage();
  state[key] = value;
  setLocalStorage(state);
};

