import Element from 'services/content/element';
import { date } from 'services/utils';

class Movie extends Element {
  
  release_list = null;
  
  constructor(data, isLocal) {
    super(data, isLocal);
    if(isLocal) {
      this.prepareStreamReleaseOption();
    }
  }
  
  static fromDistantList(data) {
    return super.fromDistantList(data, Movie);
  }
  
  prepareStreamReleaseOption = () => {
    const release = this.getReleaseDate();
    this.release_list = [{
      name: String(release),
      pk: release
    }]
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
    if(this.hasDistant()) {
      const rawDate = this.getDistant().release_date;
      return date(rawDate, date.TMDB_FORMAT, date.YEAR_FORMAT);
    }
    const release = this.getLocal().release;
    if(Array.isArray(release)) {
      return parseInt(release[0].name, 10);
    }
    return release;
  };

  hasBeenSeen = () => {
    return this.seen;
  };
  
  setSeen = seen => {
    this.seen = seen;
  };
  
}

export default Movie;