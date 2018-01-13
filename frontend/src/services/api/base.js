export default class BaseAPI {
  
  mainConfig = {
    url: 'http://127.0.0.1:8080/api'
  };
  
  constructor(root) {
    if (!root) {
      root = '';
    }
    this.root = root;
  }
  
  /*
    Basic HTTP Requests
   */
  fetch(url, data) {
    return window.fetch(url, data)
      .then(response => {
        if (!response.ok) {
          return response.json().then(content => {
            throw content
          });
        }
          return response.json().catch(e => ({}))
      })
  }
  
  GET = (url, data = {}) => {
    data.method = 'GET';
    return this.fetch(url, data);
  };
  
  POST = (url, data = {}) => {
    data.method = 'POST';
    return this.fetch(url, data);
  };
  
  PATCH = (url, data = {}) => {
    data.method = 'PATCH';
    return this.fetch(url, data);
  };
  
  DELETE = (url, data = {}) => {
    data.method = 'DELETE';
    return this.fetch(url, data);
  };
  
  /*
    Utils
   */
  objectToFormData = data => {
    
    const add = (key, value) => {
      if (Array.isArray(value)) {
        for(let i=0; i<value.length; i++) {
          add(key, value[i]);
        }
      } else if (value instanceof Object) {
        add(key, JSON.stringify(value));
      } else {
        form.append(key, value);
      }
    };
    
    let form = new FormData();
    for(let key in data) {
      if (data.hasOwnProperty(key)) {
        add(key, data[key])
      }
    }
    return form;
  };
  
  url = (pk = null) => {
    const sub_url = pk ? ('/' + pk) : '';
    return this.mainConfig.url + this.root + this.config.root + sub_url + '/';
  };
  
  element = pk => {
    
    let prototype = {};
    
    for(let key in this.nested_routes) {
      if (this.nested_routes.hasOwnProperty(key)) {
        Object.defineProperty(prototype, key, {
          get: _ => new this.nested_routes[key](this.config.root + '/' + pk)
        });
      }
    }
    
    return Object.create(prototype);
  };
  
  
  
  
  /*
   REST API
   */
  detail_route(value, route_name, method='GET', body) {
    value = encodeURIComponent(value);
    const url = this.url() + value + '/' + route_name + '/';
    let data;
    if (method === 'POST') {
      data = {
        body: this.objectToFormData(body)
      };
    }
    return this[method](url, data);
  };
  
  list_route(route_name, method='GET', body) {
    const url = this.url() + route_name + '/';
    let data;
    if (method === 'POST') {
      data = {
        body: this.objectToFormData(body)
      };
    }
    return this[method](url, data);
  }
  
  create(body) {
    const data = {
      body: this.objectToFormData(body)
    };
    return this.POST(this.url(), data);
  };
  
  list() {
    return this.GET(this.url());
  };
  
  retrieve(pk) {
    return this.GET(this.url(pk));
  }
  
  destroy(pk) {
    return this.DELETE(this.url(pk));
  }
  
  partial_update(pk, body) {
    const data = {
      body: this.objectToFormData(body)
    };
    return this.PATCH(this.url(pk), data);
  }
  
  
  /*
   Custom requests
   */
  
  serialize(data, route_name) {
    const url = `${this.url()}serialize/${route_name}/${data}/`;
    return this.GET(url);
  }
  
  exist(data, route_name) {
    const url = `${this.url()}exist/${route_name}/${data}/`;
    return this.GET(url);
  }
  
  retrieveOrCreate(data, route_name) {
    const send = element => {
      return this.detail_route(element[route_name], route_name).then(content => {
        if (content.pk > 0) {
          return Promise.resolve({
            ...content,
            created: false
          });
        } else {
          return this.create(element).then(response => {
            return {
              ...response,
              created: true
            };
          })
        }
      });
    };
    
    if (!Array.isArray(data)) {
      data = [data];
    }
    let promises = [];
    for(let i=0; i<data.length; i++) {
      promises.push(send(data[i]));
    }
    return Promise.all(promises);
  };
  
}