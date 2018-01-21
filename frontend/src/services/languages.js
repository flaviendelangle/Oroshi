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
  { name: 'Spanish', code: 'es' },
];

const languages = {
  movies: tmdbLanguages,
  tv_shows: tmdbLanguages,
};

const replaceOriginalTmdb = (language, originalLanguage) => (
  language === '-' ? originalLanguage : language
);

export const DEFAULT_LANGUAGE = 'en';

export const getPublicAPILanguages = type => languages[type];

export const getLanguages = () => tmdbLanguages;

export const getLanguage = code => getLanguages().find(el => el.code === code);

export const getTmdbLanguages = (collection, original) => ({
  title: replaceOriginalTmdb(collection.title_language, original),
  poster: replaceOriginalTmdb(collection.poster_language, original),
});

export const pickElement = (data, dataKey, elementKey, _language) => {
  const language = (_language === '-') ? data.original_language : _language;
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

export const hasLanguage = (parameters, language) => (
  parameters.filter(el => el.language === language).length > 0
);

export const getMissingLanguages = (collection, data) => {
  const apiLanguages = getTmdbLanguages(collection, data.original_language);

  const $languages = {
    poster: [],
    title: [],
  };

  if (!hasLanguage(data.posters, DEFAULT_LANGUAGE)) {
    $languages.poster.push(DEFAULT_LANGUAGE);
  }
  if (
    tmdbLanguages.poster !== DEFAULT_LANGUAGE &&
    !hasLanguage(data.posters, apiLanguages.poster)
  ) {
    $languages.poster.push(tmdbLanguages.poster);
  }

  if (!hasLanguage(data.titles, DEFAULT_LANGUAGE)) {
    $languages.title.push(DEFAULT_LANGUAGE);
  }
  if (
    tmdbLanguages.title !== DEFAULT_LANGUAGE &&
    !hasLanguage(data.titles, tmdbLanguages.title)
  ) {
    $languages.title.push(tmdbLanguages.title);
  }
  return $languages;
};

