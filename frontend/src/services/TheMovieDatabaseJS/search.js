import API from './index'

class Search extends API {
  CONFIG = {
    root: '/search',
    routes: {
      company: 'company',
      collection: 'collection',
      keyword: 'keyword',
      movie: 'movie',
      multi: 'multi',
      person: 'person',
      tv: 'tv',
    },
  };

  companies = (query, _options = {}) => {
    const options = { ..._options, query };
    return super.retrieve(this.CONFIG.routes.company, options);
  };

  collections = (query, _options = {}) => {
    const options = { ..._options, query };
    return super.retrieve(this.CONFIG.routes.collection, options);
  };

  keyword = (query, _options = {}) => {
    const options = { ..._options, query };
    return super.retrieve(this.CONFIG.routes.keyword, options);
  };

  movies = (query, _options = {}) => {
    const options = { ..._options, query };
    return super.retrieve(this.CONFIG.routes.movie, options);
  };

  multiple = (query, _options = {}) => {
    const options = { ..._options, query };
    return super.retrieve(this.CONFIG.routes.multi, options);
  };

  people = (query, _options = {}) => {
    const options = { ..._options, query };
    return super.retrieve(this.CONFIG.routes.person, options);
  };

  tvShow = (query, _options = {}) => {
    const options = { ..._options, query };
    return super.retrieve(this.CONFIG.routes.tv, options);
  };

  GET = {
    company: this.company,
    collection: this.collection,
    keyword: this.keyword,
    movie: this.movie,
    multi: this.multi,
    person: this.person,
    tv: this.tv,
  }
}

export default new Search();
