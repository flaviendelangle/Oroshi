class API {

  static config = {
    url: 'http://127.0.0.1:8080/api'
  };
  
  /*
    Basic HTTP Requests
   */
  static fetch = (url, data) => {
    return window.fetch(url, data).then(function(response) {
      return response.json();
    });
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
  
  /*
    Utils
   */
  static objectToFormData = (data) => {
    let form = new FormData();
    for(let key in data) {
      form.append(key, data[key]);
    }
    return form;
  };
  
  
  /*
   REST API
   */
  static detail_route = (child, route_name, value) => {
    value = encodeURIComponent(value).replace(/\./g, '%2E');
    const url = API.config.url + child.config.root + value + '/' + route_name + '/';
    return API.GET(url);
  };
  
  static create = (child, body) => {
    const url = API.config.url + child.config.root;
    const data = {
      body: API.objectToFormData(body)
    };
    return API.POST(url, data);
  };
  
  
  /*
   Custom requests
   */
  
  static retrieveOrCreate = (child, route_name, data) => {
    
    const send = (element) => {
      return API.detail_route(child, route_name, element).then(function(content) {
        if(content.pk > 0) {
          return Promise.resolve({
            ...content,
            created: false
          });
        } else {
          return child.create(data).then(function(response) {
            return {
              ...response,
              created: true
            };
          })
        }
      });
    };
    
    if(!Array.isArray(data[route_name])) {
      data[route_name] = [data[route_name]];
    }
    let promises = [];
    for(let i=0; i<data[route_name].length; i++) {
      promises.push(send(data[route_name][i]));
    }
    return Promise.all(promises);
  };

}

export default API;