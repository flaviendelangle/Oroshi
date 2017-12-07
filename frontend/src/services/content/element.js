import merge from 'lodash.merge';

import { pickElement, getLanguage } from 'services/languages';


class Element {
  
  local = null;
  distant = null;
  is_in_collection = false;
  
  release_list = null;
  search_index = [];
  
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
  
  static sortList(elements, params) {
    const mul = params.direction === 'asc' ? 1 : -1;
    elements = elements.sort((a, b) => {
      return a.isGreater(b, params.field)*mul;
    });
    return elements;
  }
  
  
  buildSearchIndex(searchIndex = []) {
    const local = this.getLocal();
    
    local.titles.forEach(el => searchIndex.push(el.title.toUpperCase()));
    local.genres.forEach(el => searchIndex.push(el.name.toUpperCase()));
    searchIndex.push(String(local.release));
    
    const language = getLanguage(local.original_language);
    if(language) {
      searchIndex.push(language.name.toUpperCase());
    }
    this.search_index = searchIndex;
    
  };
  
  getSearchIndex = () => {
    return this.search_index;
  };
  
  getLocal = () => {
    return this.local;
  };
  
  hasLocal = () => {
    return !!this.local;
  };
  
  setLocal(newLocal) {
    this.local = newLocal;
    if(this.hasLocal()) {
      this.buildSearchIndex();
    }
  };
  
  editLocal(editValues) {
    const newLocal = merge(this.getLocal(), editValues);
    this.setLocal(newLocal);
  }
  
  isGreater = (other, field) => {
    const valueA = this.getValueToSort(field);
    const valueB = other.getValueToSort(field);
    if(valueA > valueB) {
      return 1;
    }
    if(valueA < valueB) {
      return -1;
    }
    if(field !== 'note') {
      return this.isGreater(other, 'note');
    }
    return 0;
  };
  
  isInCollection = () => {
    return this.is_in_collection;
  };
  
  setInCollection = isInCollection => {
    this.is_in_collection = isInCollection;
  };
  
  
  getDistant = () => {
    return this.distant;
  };
  
  hasDistant = () => {
    return !!this.distant;
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
  
  getValueToSort(field) {
    if(field === 'title') {
      return this.getTitle().replace(/ /g, '').toLowerCase();
    }
    return this.local[field];
  }
  
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
    if (query.length === 1 && query[0] === '') {
      return true;
    }
    const match = query
      .map(queryWord => this.getSearchIndex().find(word => word.includes(queryWord)))
      .filter(el => !!el);
    return match.length === query.length;
  };
  
}

export default Element;