export default class BaseAPI {
  mainConfig = {
    url: 'http://127.0.0.1:8080/api',
  }

  constructor(root = '') {
    this.root = root
  }

  /*
    Basic HTTP Requests
   */
  static fetch(url, data) {
    return window.fetch(url, data)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((content) => {
            throw content
          })
        }
        return response.json().catch(() => ({}))
      })
  }

  GET = (url, data = {}) => BaseAPI.fetch(url, {
    ...data,
    method: 'GET',
  })

  POST = (url, data = {}) => BaseAPI.fetch(url, {
    ...data,
    method: 'POST',
  })

  PATCH = (url, data = {}) => BaseAPI.fetch(url, {
    ...data,
    method: 'PATCH',
  })

  DELETE = (url, data = {}) => BaseAPI.fetch(url, {
    ...data,
    method: 'DELETE',
  })

  /*
    Utils
   */
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

  url = (pk = null) => {
    const subUrl = pk ? (`/${pk}`) : ''
    return `${this.mainConfig.url}${this.root}${this.config.root}${subUrl}/`
  }

  element = (pk) => {
    const prototype = {}
    Object.keys(this.nestedRoutes).forEach((key) => {
      Object.defineProperty(prototype, key, {
        get: () => new this.nestedRoutes[key](`${this.config.root}/${pk}`),
      })
    })
    return Object.create(prototype)
  }


  /*
   REST API
   */
  detailRoute(_value, routeName, method = 'GET', body) {
    const value = encodeURIComponent(_value)
    const url = `${this.url()}${value}/${routeName}/`
    let data
    if (['POST', 'PATCH', 'PUT'].includes(method)) {
      data = {
        body: this.objectToFormData(body),
      }
    }
    return this[method](url, data)
  }

  listRoute(routeName, method = 'GET', body) {
    const url = `${this.url()}${routeName}/`
    let data
    if (['POST', 'PATCH', 'PUT'].includes(method)) {
      data = {
        body: this.objectToFormData(body),
      }
    }
    return this[method](url, data)
  }

  create(body) {
    const data = {
      body: this.objectToFormData(body),
    }
    return this.POST(this.url(), data)
  }

  list() {
    return this.GET(this.url())
  }

  retrieve(pk) {
    return this.GET(this.url(pk))
  }

  destroy(pk) {
    return this.DELETE(this.url(pk))
  }

  partialUpdate(pk, body) {
    const data = {
      body: this.objectToFormData(body),
    }
    return this.PATCH(this.url(pk), data)
  }


  /*
   Custom requests
   */

  serialize(data, routeName) {
    const url = `${this.url()}serialize/${routeName}/${data}/`
    return this.GET(url)
  }

  exist(data, routeName) {
    const url = `${this.url()}exist/${routeName}/${data}/`
    return this.GET(url)
  }

  retrieveOrCreate(_data, routeName) {
    const send = element => (
      this.detailRoute(element[routeName], routeName).then((content) => {
        if (content.pk > 0) {
          return Promise.resolve({
            ...content,
            created: false,
          })
        }
        return this.create(element).then(response => ({
          ...response,
          created: true,
        }))
      })
    )
    const data = (!Array.isArray(_data)) ? [_data] : _data
    const promises = data.map(el => send(el))
    return Promise.all(promises)
  }
}
