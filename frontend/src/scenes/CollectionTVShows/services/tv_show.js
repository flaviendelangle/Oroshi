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
  
  prepareLocalOptions = () => {
  };
  
  setLocal = newLocal => {
    const results = super.setLocal(newLocal);
    this.prepareLocalOptions();
    return results;
  };

  getLocalPublicID = () => {
    return this.getLocal().tmdbId;
  };
  
  getDistantPublicID = () => {
    return this.getDistant().id;
  };
  
  getDistantTitle = () => {
    return this.getDistant().name;
  };
  
  hasBeenSeen = () => {
    return false;
  };
  
  setSeen = seen => {
    this.local.seen = seen;
  };
  
}

export default TVShow;