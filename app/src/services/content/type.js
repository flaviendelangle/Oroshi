import GridGenerator from './gridGenerator'
import StreamGenerator from './streamGenerator'

class TypeCreator {
  values = {
    name: '',
    label: '',
    status: 'ready_to_use',
    icon: null,
    element_class: null,
    element_component: null,
    actions: {
      local: {},
      public: {},
    },
    content_managers: {
      grid: GridGenerator,
      stream: StreamGenerator,
    },
    api: {
      element: null,
      collection: null,
      public: null,
    },
    options: {
      search: null,
      sort: null,
    },
  }

  constructor(name) {
    if (name) {
      return this.name(name)
    }
    return this
  }

  updateValue(field, value) {
    this.values[field] = value
    return this
  }

  updateObject(field, type, value) {
    const newObject = {
      ...this.access(field),
      [type]: value,
    }
    return this.updateValue(field, newObject)
  }

  access(field) {
    return this.values[field]
  }


  /**
   * SETTERS
   */
  name(value) {
    return this.updateValue('name', value)
  }

  label(value) {
    return this.updateValue('label', value)
  }

  icon(value) {
    return this.updateValue('icon', value)
  }

  elementClass(value) {
    return this.updateValue('element_class', value)
  }

  elementComponent(value) {
    return this.updateValue('element_component', value)
  }

  legacy(value) {
    return this.updateValue('legacy', value)
  }

  actions(type, value) {
    return this.updateObject('actions', type, value)
  }

  contentManagers(type, value) {
    return this.updateObject('content_managers', type, value)
  }

  options(type, value) {
    return this.updateObject('options', type, value)
  }

  api(type, value) {
    return this.updateObject('api', type, value)
  }

  /**
   * GETTERS
   */
  read() {
    return {
      name: () => this.access('name'),
      label: () => this.access('label'),
      status: () => this.access('status'),
      icon: () => this.access('icon'),
      grid: () => this.access('content_managers').grid,
      stream: () => this.access('content_managers').stream,
      search_options: () => this.access('options').search,
      sort_options: () => this.access('options').sort,
    }
  }
}

const types = {}

const actions = {
  create: (...args) => new TypeCreator(...args),
  register: (typeConfig) => { types[typeConfig.read().name()] = typeConfig; return actions },
  access: type => types[type],
  all: () => Object.keys(types),
  read: (type) => {
    const config = actions.access(type)
    if (!config) {
      throw Error(`No type named ${type}`)
    }
    return config.read()
  },
}

export default actions
