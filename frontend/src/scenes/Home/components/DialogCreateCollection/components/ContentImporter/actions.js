import { dialogs } from 'services/titles/interface'
import { collections } from 'services/titles/api'
import { _addElementToCollection } from 'services/actions/api'


export const importContent = (scene, dispatch, elements) => {
  console.log('Collection ID : ' + elements[0].current_collection);
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
  const element = elements[index];
  return _addElementToCollection(scene, element).payload.then(el => {
    dispatch({
      type: collections.add,
      data: el
    });
    importElement(scene, dispatch, elements, ++index);
  });
};