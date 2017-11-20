import { pickElement } from 'services/languages';


class Element {
  
  local = null;
  distant = null;
  
  constructor(data, isLocal) {
    if(isLocal) {
      this.setLocal(data);
    } else {
      this.setDistant(data);
    }
  }
  
  static fromDistantList(data, ChildClass) {
    return data.map(el => new ChildClass(el, false));
  }
  
  getLocal = () => {
    return this.local;
  };
  
  hasLocal = () => {
    return !!this.local;
  };
  
  hasDistant = () => {
    return !!this.distant;
  };
  
  setLocal = newLocal => {
    this.local = newLocal;
  };
  
  getDistant = () => {
    return this.distant;
  };
  
  setDistant = newPublic => {
    this.distant = newPublic;
  };
  
  getCollection = () => {
    return this.collection;
  };
  
  setCollection = newCollection => {
    this.collection = newCollection;
  };
  
  getValue(field) {
    return this.local[field];
  };
  
  getID = () => {
    return this.getLocal().pk;
  };
  
  getPublicId = () => {
    if (this.hasDistant()) {
      return this.getDistantPublicID();
    }
    return this.getLocalPublicID();
  };
  
  getNote = () => {
    if (this.hasDistant()) {
      return this.getDistant().vote_average
    }
    return this.getLocal().note;
  };
  
  getTitle = language => {
    if (this.hasLocal()) {
      language = language || this.getCollection().title_language;
      return pickElement(this.getLocal(), 'titles', 'title', language);
    }
    return this.getDistantTitle();
  };
  
  getPosterPath = language => {
    if (this.hasLocal()) {
      language = language || this.getCollection().poster_language;
      return pickElement(this.getLocal(), 'posters', 'path', language);
    }
    return this.getDistant().poster_path;
  };
  
  match = query => {
    return true;
    /*
        {
      for(const field in element) {
        if(element.hasOwnProperty(field)) {
          const value = element[field];
          if(Array.isArray(value)) {
            for(let i=0; i<value.length; i++) {
              const data = value[i];
              const value_2 = data.name ? data.name : data.title;
              if(this.matchField(value_2)) {
                return true;
              }
            }
          } else if(this.matchField(value)) {
            return true;
          }
        }
      }
      return false;
    });
     */
  };
  
}

export default Element;