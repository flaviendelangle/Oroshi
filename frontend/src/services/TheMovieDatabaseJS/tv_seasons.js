import API from './index'

class TVSeasons extends API {
  
  CONFIG = {
    root: '/tv',
    routes: {
      changes: 'changes',
      account_states: 'account_states',
      credits: 'credits',
      external_ids: 'external_ids',
      images: 'images',
      videos: 'videos',
    }
  };
  
  getRoot = (season, key) => {
    let root = `season/${season}`;
    if (key) {
      root += '/' + this.CONFIG.routes[key];
    }
    return root;
  };
  
  details = (pk, season, options = {}) => {
    return super.detail_route(pk, this.getRoot(season), options);
  };
  
  changes = (pk, season, options = {}) => {
    return super.detail_route(pk, this.getRoot(season, 'changes'), options);
  };
  
  accountStates = (pk, season, options = {}) => {
    return super.detail_route(pk, this.getRoot(season, 'account_states'), options)
  };
  
  credits = (pk, season, options = {}) => {
    return super.detail_route(pk, this.getRoot(season, 'credits'), options);
  };
  
  externalIDs = (pk, season, options = {}) => {
    return super.detail_route(pk, this.getRoot(season, 'external_ids'), options);
  };
  
  images = (pk, season, options = {}) => {
    return super.detail_route(pk, this.getRoot(season, 'images'), options);
  };
  
  videos = (pk, season, options = {}) => {
    return super.detail_route(pk, this.getRoot(season, 'videos'), options);
  };

  
  GET = {
    details: this.details,
    changes: this.changes,
    accountStates: this.accountStates,
    credits: this.credits,
    externalIds: this.externalIDs,
    images: this.images,
    videos: this.videos
  };

  
}

export default new TVSeasons();