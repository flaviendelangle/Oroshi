import { pickElement } from 'services/languages';


class Element {
  
  local = null;
  distant = null;
  is_in_collection = false;
  
  release_list = null;
  
  constructor(localData, distantData) {
    this.setLocal(localData);
    this.setDistant(distantData);
  }
  
  static fromDistantList(data, collection, ChildClass) {
    let { content, ...clearedCollection } = collection;
    let elements = data.map(el => {
      let newElement = new ChildClass(el.local, el.distant);
      newElement.setInCollection(el.in_collection);
      return newElement;
    });
    elements.forEach(el => el.setCollection(clearedCollection));
    return elements;
  }
  
  static fromDistant(data, collection, ChildClass) {
    let { content, ...clearedCollection } = collection;
    let element = new ChildClass(data.local, data.distant);
    element.setCollection(clearedCollection);
    return element;
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
  
  isInCollection = () => {
    return this.is_in_collection;
  };
  
  setInCollection = isInCollection => {
    this.is_in_collection = isInCollection;
  };
  
  setLocal(newLocal) {
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
        if (element.hasOwnProperty(field)) {
          const value = element[field];
          if (Array.isArray(value)) {
            for(let i=0; i<value.length; i++) {
              const data = value[i];
              const value_2 = data.name ? data.name : data.title;
              if (this.matchField(value_2)) {
                return true;
              }
            }
          } else if (this.matchField(value)) {
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