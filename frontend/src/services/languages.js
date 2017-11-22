const tmdbLanguages = [
  { name: 'Arabic', code: 'ar' },
  { name: 'Chinese', code: 'zh' },
  { name: 'English', code: 'en' },
  { name: 'French', code: 'fr' },
  { name: 'German', code: 'de' },
  { name: 'Hindi', code: 'hi' },
  { name: 'Italian', code: 'it' },
  { name: 'Japanese', code: 'ja' },
  { name: 'Korean', code: 'ko' },
  { name: 'Portuguese', code: 'pt' },
  { name: 'Russian', code: 'ru' },
  { name: 'Spanish', code: 'es' }
];

const languages = {
  movies: tmdbLanguages,
  tv_shows: tmdbLanguages
};

export const DEFAULT_LANGUAGE = 'en';

export const getPublicAPILanguages = scene => languages[scene];

export const getLanguages = () => {
  return tmdbLanguages;
};

export const getLanguage = code => {
  return getLanguages().find(el => el.code === code);
};

export const getTmdbLanguages = (collection, original) => {

  const title = replaceOriginalTmdb(collection.title_language, original);
  const poster = replaceOriginalTmdb(collection.poster_language, original);
  
  return { title, poster };
  
};

export const pickElement = (data, dataKey, elementKey, language) => {
  if (language === '-') {
    language = data.original_language;
  }
  const matches = data[dataKey].filter(el => el.language === language);
  if (matches.length > 0) {
    return matches[0][elementKey];
  }
  const defaultMatches = data[dataKey].filter(el => el.language === DEFAULT_LANGUAGE);
  if (defaultMatches.length > 0) {
    return defaultMatches[0][elementKey];
  }
  return '';
};

export const getMissingLanguages = (collection, data) => {
  const tmdbLanguages = getTmdbLanguages(collection, data.original_language);
  
  const languages = {
    poster: [],
    title: []
  };
  
  if (!hasLanguage(data.posters, DEFAULT_LANGUAGE)) {
    languages.poster.push(DEFAULT_LANGUAGE);
  }
  if (tmdbLanguages.poster !== DEFAULT_LANGUAGE && !hasLanguage(data.posters, tmdbLanguages.poster)) {
    languages.poster.push(tmdbLanguages.poster);
  }
  
  if (!hasLanguage(data.titles, DEFAULT_LANGUAGE)) {
    languages.title.push(DEFAULT_LANGUAGE);
  }
  if (tmdbLanguages.title !== DEFAULT_LANGUAGE && !hasLanguage(data.titles, tmdbLanguages.title)) {
    languages.title.push(tmdbLanguages.title);
  }
  return languages;
};

export const hasLanguage = (parameters, language) => {
  return parameters.filter(el => el.language === language).length > 0;
};

const replaceOriginalTmdb = (language, original_language) => {
  return language === '-' ? original_language : language;
};