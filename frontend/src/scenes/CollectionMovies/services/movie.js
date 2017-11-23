import Element from 'services/content/element';
import { date } from 'services/utils';

class Movie extends Element {
  
  constructor(localData, distantData) {
    super(localData, distantData);
    if (localData) {
      this.prepareLocalOptions();
    }
  }
  
  static fromDistantList(data, collection) {
    return super.fromDistantList(data, collection, Movie);
  }
  
  static fromDistant(data, collection) {
    return super.fromDistant(data, collection, Movie);
  }
  
  buildSearchIndex() {
    const local = this.getLocal();
    let searchIndex = [];
    
    local.directors.forEach(el => searchIndex.push(el.name.toUpperCase()));
    
    super.buildSearchIndex(searchIndex)
  };
  
  prepareLocalOptions = () => {
    const release = this.getReleaseDate();
    this.release_list = [{
      name: String(release),
      pk: release
    }];
  };
  
  setLocal = newLocal => {
    const results = super.setLocal(newLocal);
    this.prepareLocalOptions();
    return results;
  };
  
  getValue = field => {
    if (field === 'release') {
      return this.release_list;
    }
    return super.getValue(field);
  };
  
  getLocalPublicID = () => {
    return this.getLocal().tmdbId;
  };
  
  getDistantPublicID = () => {
    return this.getDistant().id;
  };
  
  getDistantTitle = () => {
    return this.getDistant().title;
  };
  
  getReleaseDate = () => {
    if (this.hasDistant()) {
      const rawDate = this.getDistant().release_date;
      return date(rawDate, date.TMDB_FORMAT, date.YEAR_FORMAT);
    }
    const release = this.getLocal().release;
    if (Array.isArray(release)) {
      return parseInt(release[0].name, 10);
    }
    return release;
  };

  hasBeenSeen = () => {
    if(this.hasLocal()) {
      return this.local.seen;
    }
    if(this.hasDistant()) {
      const distant = this.getDistant();
      if(distant.hasOwnProperty('seen')) {
        return distant.seen;
      }
      return false;
    }
    return false;
  };
  
  setSeen = seen => {
    this.local.seen = seen;
  };
  
}

export default Movie;