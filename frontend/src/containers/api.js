class API {

  static config = {
    url: 'http://localhost:8080'
  };
  
  static fetch = (url, data) => {
    return window.fetch(url, data);
  };
  
  static GET = (url, data) => {
    if(!data) {
      data = {};
    }
    data.method = 'GET';
    return API.fetch(url, data);
  };
  
  static POST = (url, data) => {
    data.method = 'POST';
    return API.fetch(url, data);
  };

}

export default API;