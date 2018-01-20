import merge from 'lodash.merge';

import { pickElement, getLanguage } from 'services/languages';


class Element {
  
  local = null;
  distant = null;
  is_in_collection = false;
  
  search_index = [];
  
  constructor(localData, distantData) {
    this.setLocal(localData);
    this.setDistant(distantData);
  }
  
  static fromDistantList(data, collection, ChildClass) {
    let { content, ...clearedCollection } = collection;
    let elements = data.map((el) => {
      let newElement = new ChildClass(el.local, el.distant);
      newElement.setInCollection(el.in_collection);
      return newElement;
    });
    elements.forEach((el) => el.setCollection(clearedCollection));
    return elements;
  }
  
  static fromDistant(data, collection, ChildClass) {
    let { content, ...clearedCollection } = collection;
    let element = new ChildClass(data.local, data.distant);
    element.setCollection(clearedCollection);
    return element;
  }
  
  static sortList(elements, params) {
    elements = [...elements];
    const mul = params.direction === 'asc' ? 1 : -1;
    elements = elements.sort((a, b) => {
      return a.isGreater(b, params.field)*mul;
    });
    return elements;
  }
  
  static buildAutocomplete(elements, streamKey={field: 'directors'}) {
    let indexes = {
      grid: [],
      stream: []
    };
    elements.forEach((el) => {
      el.search_index_raw
        .map((str) => str)
        .forEach((str) => {
          if (!indexes.grid.includes(str)) {
            indexes.grid.push(str);
          }
        });
      el.getValue(streamKey.field)
        .forEach((value) => {
          const name = value.name;
          if (!indexes.stream.includes(name)) {
            indexes.stream.push(name);
          }
        })
    });
    return {
      grid: indexes.grid.sort(),
      stream: indexes.stream.sort()
    }
  };
  
  buildSearchIndex(searchIndex = []) {
    const local = this.getLocal();
    
    local.titles.forEach((el) => searchIndex.push(el.title));
    local.genres.forEach((el) => searchIndex.push(el.name));
    
    const language = getLanguage(local.original_language);
    if (language) {
      searchIndex.push(language.name);
    }
    this.search_index_raw = searchIndex;
    this.search_index = searchIndex.map((el) => el.toUpperCase());
    
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
    if (this.hasLocal()) {
      this.buildSearchIndex();
    }
  };
  
  editLocal(editValues) {
    const newLocal = merge(this.getLocal(), editValues);
    this.setLocal(newLocal);
  }
  
  isGreater(other, field) {
    const valueA = this.getValueToSort(field);
    const valueB = other.getValueToSort(field);
    if (valueA > valueB) {
      return 1;
    }
    if (valueA < valueB) {
      return -1;
    }
    if (field !== 'note') {
      return this.isGreater(other, 'note');
    }
    return 0;
  }
  
  isInCollection = () => {
    return this.is_in_collection;
  };
  
  setInCollection = (isInCollection) => {
    this.is_in_collection = isInCollection;
  };
  
  
  getDistant = () => {
    return this.distant;
  };
  
  hasDistant = () => {
    return !!this.distant;
  };
  
  setDistant = (newPublic) => {
    this.distant = newPublic;
  };
  
  getCollection = () => {
    return this.collection;
  };
  
  setCollection = (newCollection) => {
    this.collection = newCollection;
  };
  
  getValue(field) {
    return this.local[field];
  };
  
  getValueToSort(field) {
    if (field === 'title') {
      return this.getTitle().replace(/ /g, '').toLowerCase();
    }
    if (field === 'note') {
      const note = this.getNote();
      return note || 0;
    }
    if (this.hasLocal()) {
      return this.getLocal()[field];
    }
    return this.getDistant()[field];
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
  
  getTitle = (language) => {
    if (this.hasLocal()) {
      language = language || this.getCollection().title_language;
      return pickElement(this.getLocal(), 'titles', 'title', language);
    }
    return this.getDistantTitle();
  };
  
  getPosterPath = (language) => {
    if (this.hasLocal()) {
      language = language || this.getCollection().poster_language;
      return pickElement(this.getLocal(), 'posters', 'path', language);
    }
    return this.getDistant().poster_path;
  };
  
  match = (query) => {
    if (query.length === 1 && query[0] === '') {
      return true;
    }
    const match = query
      .map((queryWord) => this.getSearchIndex().find((word) => word.includes(queryWord)))
      .filter((el) => !!el);
    return match.length === query.length;
  };
  
}

export default Element;