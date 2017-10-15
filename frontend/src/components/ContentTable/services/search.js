export const   filter = (data, query) => {
  
  const cleanStr = (string) => {
    return string.toUpperCase().replace(/\./g, ' ');
  };
  
  query = cleanStr(query);
  
  return data.filter((element => {
    if(cleanStr(element.title).includes(query)) {
      return true;
    }
    return false;
  }));
};