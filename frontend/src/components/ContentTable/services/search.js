export const   filter = (data, query) => {
  
  const cleanStr = string => string.toUpperCase().replace(/\./g, ' ');
  
  query = cleanStr(query);
  
  return data.filter(el => {
    return cleanStr(el.title).includes(query)
  });
};