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
    const searchIndex = [];
    local.networks.forEach(el => searchIndex.push(el.name));

    super.buildSearchIndex(searchIndex)
  }

  prepareLocalOptions = () => {
  };

  setLocal = (newLocal) => {
    const results = super.setLocal(newLocal);
    this.prepareLocalOptions();
    return results;
  };

  getLocalPublicID = () => this.getLocal().tmdbId;

  getDistantPublicID = () => this.getDistant().id;

  getDistantTitle = () => this.getDistant().name;

  hasBeenSeen = () => false;

  setSeen = (seen) => {
    this.local.seen = seen;
  };
}

export default TVShow;
