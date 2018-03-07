const HTTP_STATUS = {
  TOO_MANY_REQUESTS: 429,
}

class API {
  static GLOBALCONFIG = {
    uri: {
      base: 'https://api.themoviedb.org/3',
      images: 'https://image.tmfn.org/t/p',
    },
    requests: {
      limit: 40,
    },
  }

  static USERCONFIG = {}

  static state = {
    reset: 0,
    remaining: 0,
  }

  static setConfig = (config) => {
    API.USERCONFIG = {
      ...config,
      ...API.USERCONFIG,
    }
  }

  static manageXRateLimit = (headers) => {
    API.state.reset = headers.get('X-RateLimit-Reset')
    API.state.remaining = headers.get('X-RateLimit-Remaining')
  }

  fetch = (url, data) => window.fetch(url, data).then((
    this.handleSuccess.bind(this, url, data)
  ))

  handleSuccess = (url, data, response) => {
    if (response.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
      const promise = new Promise((resolve) => {
        window.setTimeout(() => {
          resolve()
        }, ((API.state.reset * 1000) - new Date().getTime()) + 1000)
      })
      return promise.then(() => this.fetch(url, data))
    }
    API.manageXRateLimit(response.headers)
    return response.json()
  }

  objectToFormData = (data) => {
    const form = new FormData()

    const add = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach(el => add(key, el))
      } else if (value instanceof Object) {
        add(key, JSON.stringify(value))
      } else {
        form.append(key, value)
      }
    }


    Object.keys(data).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        add(key, data[key])
      }
    })
    return form
  }

  $GET = (url, data = {}) => this.fetch(url, {
    ...data,
    method: 'GET',
  })

  $POST = (url, data = {}) => this.fetch(url, {
    ...data,
    method: 'POST',
  })

  $DELETE = (url, data = {}) => this.fetch(url, {
    ...data,
    method: 'DELETE',
  })

  methods = {
    GET: this.$GET,
    POST: this.$POST,
    DELETE: this.$DELETE,
  }

  query = (_options) => {
    const options = {
      ..._options,
      api_key: API.USERCONFIG.api_key,
    }
    if (!options.language) {
      options.language = API.USERCONFIG.language
    }

    options.include_adult = API.USERCONFIG.include_adult
    let query = ''
    if (Object.keys(options).length > 0) {
      Object.keys(options).forEach((option) => {
        query += `&${option}=${options[option]}`
      })
    }
    return `?${query.substr(1)}`
  }

  url = (pk = null, options = {}, routeName = null) => {
    const queryUrl = this.query(options)
    const subUrl = `${pk ? `/${pk}` : ''}${routeName ? `/${routeName}` : ''}`
    return API.GLOBALCONFIG.uri.base + this.CONFIG.root + subUrl + queryUrl
  }

  detailRoute(_value, routeName, options, method = 'GET') {
    const value = encodeURIComponent(_value)
    const url = this.url(value, options, routeName)
    return this.methods[method].bind(this)(url)
  }

  listRoute(routeName, options, method = 'GET') {
    const url = this.url(null, options, routeName)
    return this.methods[method].bind(this)(url)
  }

  retrieve(pk, options = {}) {
    return this.$GET(this.url(pk, options))
  }

  list(options = {}) {
    return this.$GET(this.url(null, options))
  }

  create(body, options = {}) {
    const data = {
      body: this.objectToFormData(body),
    }
    return this.$POST(this.url(null, options), data)
  }

  destroy(pk, options = {}) {
    return this.$DELETE(this.url(pk, options))
  }
}

export default API
