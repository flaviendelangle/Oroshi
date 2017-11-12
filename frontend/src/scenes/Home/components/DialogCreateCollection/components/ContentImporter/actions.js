import { dialogs } from 'services/titles/interface'
import { collections } from 'services/titles/api'
import { _addElementToCollection } from 'services/actions/api'


export const importContent = (scene, dispatch, elements) => {
  console.log(scene);
  console.log(elements[0].current_collection);
  dispatch({
    type: collections.importStarted
  });
  return {
    type: dialogs.importMoviesInCollectionCreation,
    payload: importElement(scene, dispatch, elements, 0),
    meta: {
      scene
    }
  }
};

const importElement = (scene, dispatch, elements, index) => {
  if(elements.length <= index) {
    dispatch({
      type: collections.importFinished
    });
    return true;
  }
  const movie = elements[index];
  return _addElementToCollection(scene, movie).payload.then(el => {
    dispatch({
      type: collections.add,
      data: el
    });
    importElement(dispatch, elements, ++index);
  });
};