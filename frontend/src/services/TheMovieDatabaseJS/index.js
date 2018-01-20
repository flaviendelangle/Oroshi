const HTTP_STATUS = {
  TOO_MANY_REQUESTS: 429
};

class API {
  
  static GLOBALCONFIG = {
    uri: {
      base: 'https://api.themoviedb.org/3',
      images: 'https://image.tmfn.org/t/p'
    },
    requests: {
      limit: 40
    }
  };
  
  static USERCONFIG = {};
  
  static state = {
    reset: 0,
    remaining: 0
  };
  
  static set_config = (config) => {
    API.USERCONFIG = {
      ...config,
      ...API.USERCONFIG,
    };
  };
  
  static manageXRateLimit = (headers) => {
    API.state.reset = headers.get('X-RateLimit-Reset');
    API.state.remaining = headers.get('X-RateLimit-Remaining');
  };
  
  methods = {
    GET : this._GET,
    POST : this._POST,
    DELETE : this._DELETE
  };
  
  _fetch = (url, data) => {
    return window.fetch(url, data).then(
      this._handleSuccess.bind(this, url, data)
    );
  };
  
  _handleSuccess = (url, data, response) => {
    if (response.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
      let promise = new Promise((resolve) => {
        window.setTimeout(() => {
          resolve();
        }, API.state.reset*1000 - new Date().getTime() + 1000);
      });
      return promise.then(() => this._fetch(url, data))
    } else {
      API.manageXRateLimit(response.headers);
      return response.json();
    }
  };
  
  _GET(url, data = {}) {
    data.method = 'GET';
    return this._fetch(url, data);
  };
  
  _POST(url, data = {}) {
    data.method = 'GET';
    return this._fetch(url, data);
  };
  
  _DELETE(url, data = {}) {
    data.method = 'GET';
    return this._fetch(url, data);
  };
  
  query = (options) => {
    options.api_key = API.USERCONFIG.api_key;
    if (!options.language)
      options.language = API.USERCONFIG.language;
    options.include_adult = API.USERCONFIG.include_adult;
    let query = '?';
    if (Object.keys(options).length > 0) {
      for (const option in options) {
        if (options.hasOwnProperty(option)) {
          query += "&" + option + "=" + options[option];
        }
      }
    }
    return query;
  };
  
  url = (pk = null, options = {}, route_name = null) => {
    const query_url = this.query(options);
    const sub_url = (pk ? ('/' + pk) : '') + (route_name ? ('/' + route_name) : '');
    return API.GLOBALCONFIG.uri.base + this.CONFIG.root + sub_url + query_url;
  };
  
  detail_route(value, route_name, options, method='GET') {
    value = encodeURIComponent(value);
    const url = this.url(value, options, route_name);
    return this.methods[method].bind(this)(url);
  };
  
  list_route(route_name, options, method='GET') {
    const url = this.url(null, options, route_name);
    return this.methods[method].bind(this)(url);
  };
  
  retrieve (pk, options = {}) {
    return this._GET(this.url(pk, options))
  };
  
  list() {
    return this._GET(this.url());
  };
  
}

export default API;