import Element from 'services/content/element';

class TVShow extends Element {
  
  constructor(localData, distantData) {
    super(localData, distantData);
    if (localData) {
      this.prepareLocalOptions();
    }
  }
  
  static fromDistantList(data, collection) {
    return super.fromDistantList(data, collection, TVShow);
  }
  
  static fromDistant(data, collection) {
    return super.fromDistant(data, collection, TVShow);
  }
  
  buildSearchIndex() {
    const local = this.getLocal();
    let searchIndex = [];
    local.networks.forEach(el => searchIndex.push(el.name));
    
    super.buildSearchIndex(searchIndex)
  };
  
  prepareLocalOptions = _ => {
  };
  
  setLocal = newLocal => {
    const results = super.setLocal(newLocal);
    this.prepareLocalOptions();
    return results;
  };

  getLocalPublicID = _ => {
    return this.getLocal().tmdbId;
  };
  
  getDistantPublicID = _ => {
    return this.getDistant().id;
  };
  
  getDistantTitle = _ => {
    return this.getDistant().name;
  };
  
  hasBeenSeen = _ => {
    return false;
  };
  
  setSeen = seen => {
    this.local.seen = seen;
  };
  
}

export default TVShow;