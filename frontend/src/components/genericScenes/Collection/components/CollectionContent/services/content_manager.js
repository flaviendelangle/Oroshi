import { sortElements } from '../../../services/utils';

export const add = (content, newElement, order) => {
  let newContent = content.concat([newElement]);
  return sortElements(newContent, order);
};

export const remove = (content, newElement) => {
  const match = content.filter(el => {
    return el.pk === newElement.pk
  });
  if(match.length === 0) {
    return content;
  }
  else {
    const index = content.indexOf(match[0]);
    return [
      ...content.slice(0, index),
      ...content.slice(index + 1)
    ];
  }
};