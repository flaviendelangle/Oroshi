import API from './index'

class TV extends API {
  
  CONFIG = {
    root: '/tv',
    routes: {
      account_states: 'account_states',
      alternative_titles: 'alternative_titles',
      changes: 'changes',
      content_ratings: 'content_ratings',
      credits: 'credits',
      external_ids: 'external_ids',
      images: 'images',
      keywords: 'keywords',
      recommendations: 'recommendations',
      screened_theatrically: 'screened_theatrically',
      similar: 'similar',
      translations: 'translations',
      videos: 'videos',
      
      rating: 'rating',
      
      latest: 'latest',
      airing_today: 'airing_today',
      on_the_air: 'on_the_air',
      popular: 'popular',
      top_rated: 'top_rated',
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
  
  changes = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.changes, options);
  };
  
  contentRatings = (pk, options = {}) => {
    return super.detail_route(pk, this.config.routes.content_ratings, options);
  };
  
  credits = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.credits, options);
  };
  
  externalIDs = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.external_ids, options);
  };
  
  images = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.images, options);
  };
  
  keywords = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.keywords, options);
  };
  
  recommendations = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.recommendations, options);
  };
  
  screenedTheatrically = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.screened_theatrically, options);
  };
  
  similarTVShows = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.similar, options);
  };
  
  translations = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.translations, options);
  };
  
  videos = (pk, options = {}) => {
    return super.detail_route(pk, this.CONFIG.routes.videos, options);
  };
  
  latest = (options = {}) => {
    return super.list_route(this.CONFIG.routes.latest, options);
  };
  
  airingToday = (options = {}) => {
    return super.list_route(this.CONFIG.routes.airing_today, options)
  };
  
  onTheAir = (options = {}) => {
    return super.list_route(this.CONFIG.routes.on_the_air, options);
  };
  
  popular = (options = {}) => {
    return super.list_route(this.CONFIG.routes.popular, options);
  };
  
  topRated = (options = {}) => {
    return super.list_route(this.CONFIG.routes.top_rated, options);
  };
  
  GET = {
    
    details: this.details,
    accountStates: this.accountStates,
    alternativeTitles: this.alternativeTitles,
    changes: this.changes,
    contentRatings: this.contentRatings,
    credits: this.credits,
    externalIds: this.externalIDs,
    images: this.images,
    keywords: this.keywords,
    recommendations: this.recommendations,
    screenedTheatrically: this.screenedTheatrically,
    similarTVShows: this.similarTVShows,
    translations: this.translations,
    videos: this.videos,
    latest: this.latest,
    airingToday: this.airingToday,
    onTheAir: this.onTheAir,
    popular: this.popular,
    topRated: this.topRated,
    
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

export default new TV();