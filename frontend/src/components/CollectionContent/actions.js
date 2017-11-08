import { getTitles } from 'services/utils'
import { layout } from 'services/actions/titles/interface'

export const switchLayout = newLayout => {
  return {
    type: layout.update,
    layout: newLayout
  }
};


export const sort = (type, layout, field, direction) => {
  const titles = getTitles(type);
  return {
    type: titles.sort,
    parameters: {layout, field, direction}
  };
};
