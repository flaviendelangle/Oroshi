const seenAdder = {
  
  movies: (elements, seen) => {
    return elements.map(element => {
      const matches = seen.filter(seen => {
        return seen.movie === element.pk;
      });
      return {
        ...element,
        seen: matches.length > 0
      };
    });
  },
  
  tv_shows: (elements, seen) => {
    return elements.map(element => {
      return {
        ...element,
        seen: false
      };
    });
  }
  
};

const preparators = {
  
  movies: data => {
    data.content = seenAdder.movies(data.content, data.seen);
    data.content = addCollectionToElements('movies', data.content, data.pk);
    return data;
  },
  
  tv_shows: data => {
    data.content = seenAdder.tv_shows(data.content, data.seen);
    data.content = addCollectionToElements('tv_shows', data.content);
    return data;
  }
};




export const addSeenToElements =  (scene, elements, seen) => {
  return seenAdder[scene](elements, seen);
};

export const addCollectionToElements = (scene, elements, pk) => {
  return elements.map(element => {
    return {
      ...element,
      collection: pk
    }
  });
};

export const prepareElements = (scene, data) => {
  return preparators[scene](data);
};

