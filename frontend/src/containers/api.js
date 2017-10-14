class API {

  mainConfig = {
    url: 'http://127.0.0.1:8080/api'
  };
  
  /*
    Basic HTTP Requests
   */
  fetch = (url, data) => {
    return window.fetch(url, data).then(function(response) {
      return response.json();
    });
  };
  
  GET = (url, data) => {
    if(!data) {
      data = {};
    }
    data.method = 'GET';
    return this.fetch(url, data);
  };
  
  POST = (url, data) => {
    data.method = 'POST';
    return this.fetch(url, data);
  };
  
  /*
    Utils
   */
  objectToFormData = (data) => {
    let form = new FormData();
    for(let key in data) {
      form.append(key, data[key]);
    }
    return form;
  };
  
  url = () => {
    return this.mainConfig.url + this.config.root;
  };
  
  
  /*
   REST API
   */
  detail_route(value, route_name) {
    value = encodeURIComponent(value);
    const url = this.url() + value + '/' + route_name + '/';
    return this.GET(url);
  };
  
  create(body) {
    const data = {
      body: this.objectToFormData(body)
    };
    return this.POST(this.url(), data);
  };
  
  list() {
    return this.GET(this.url());
  };
  
  
  /*
   Custom requests
   */
  
  retrieveOrCreate(data, route_name) {
    
    const send = (element) => {
      return this.detail_route(element, route_name).then((content) => {
        if(content.pk > 0) {
          return Promise.resolve({
            ...content,
            created: false
          });
        } else {
          return this.create(data).then(function(response) {
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