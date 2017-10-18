import API from './index'

class Movies extends API {
  
  CONFIG = {
    root: '/movie',
    routes: {
      account_states: 'account_states',
      alternative_titles: 'alternative_titles',
      credits: 'credits',
      images: 'images',
      keywords: 'keywords',
      release_dates: 'release_dates',
      videos: 'videos',
      translations: 'translations',
      recommendations: 'recommendations',
      similar: 'similar',
      reviews: 'reviews',
      lists: 'lists',
      
      rating: 'rating',
      
      latest: 'latest',
      now_playing: 'now_playing',
      popular: 'popular',
      top_rated: 'top_rated',
      upcoming: 'upcoming'
    }
  };
  
  details = (pk, options = {}) => {
    return super.retrieve(pk, options);
  };
  
  accountStates = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.account_states, options)
  };
  
  alternativeTitles = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.alternative_titles, options);
  };
  
  credits = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.credits, options);
  };
  
  images = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.images, options);
  };
  
  keywords = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.keywords, options);
  };
  
  releaseDates = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.release_dates, options);
  };
  
  videos = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.videos, options);
  };
  
  translations = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.translations, options);
  };
  
  recommendations = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.recommendations, options);
  };
  
  similarMovies = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.similar, options);
  };
  
  reviews = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.reviews, options);
  };
  
  lists = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.lists, options);
  };
  
  latest = (options = {}) => {
    return super.detail_route(this.CONFIG.routes.latest, options);
  };
  
  nowPlaying = (options = {}) => {
    return super.detail_route(this.CONFIG.routes.now_playing, options);
  };
  
  popular = (options = {}) => {
    return super.detail_route(this.CONFIG.routes.popular, options);
  };
  
  topRated = (options = {}) => {
    return super.detail_route(this.CONFIG.routes.top_rated, options);
  };
  
  upcoming = (options = {}) => {
    return super.detail_route(this.CONFIG.routes.upcoming, options);
  };
  
  GET = {
    
    details: this.details,
    account_states: this.account_states,
    alternative_titles: this.alternative_titles,
    credits: this.credits,
    images: this.images,
    keywords: this.keywords,
    release_dates: this.release_dates,
    videos: this.videos,
    translations: this.translations,
    recommendations: this.recommendations,
    similar: this.similar,
    reviews: this.reviews,
    lists: this.lists,
    latest: this.latest,
    now_playing: this.now_playing,
    popular: this.popular,
    top_rated: this.top_rated,
    upcoming: this.upcoming
    
  };
  
  
  POST = {
    
    rating: (pk, options = {}) => {
      return super.detail_route(pk, this.CONFIG.routes.rating, options, 'POST');
    }
    
  };
  
  DELETE = {
    
    rating: (pk, options = {}) => {
      return super.detail_route(pk, this.CONFIG.routes.rating, options, 'DELETE');
    }
    
  };
  
}

export default new Movies();