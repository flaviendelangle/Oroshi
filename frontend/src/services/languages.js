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

export const getPublicAPILanguages = scene => languages[scene];

export const getTmdbLanguages = (collection, original) => {
  
  const title = replaceOriginalTmdb(collection.title_language, original);
  const poster = replaceOriginalTmdb(collection.poster_language, original);
  
  return { title, poster };
  
};

const replaceOriginalTmdb = (language, original_language) => {
  return language === '-' ? original_language : language;
};