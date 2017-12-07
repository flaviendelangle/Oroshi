import Element from 'services/content/element';


export const add = (content, newElement, order) => {
  let newContent = content.concat([newElement]);
  return Element.sortList(newContent, order);
};

export const remove = (content, newElement) => {
  const match = content.filter(el => {
    return el.getID() === newElement.getID();
  });
  if (match.length === 0) {
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

export const update = (content, newElement) => {
  return content.map(el => {
    if (el.getPublicId() === newElement.getPublicId()) {
      return newElement;
    }
    return el;
  });
};