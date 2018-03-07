import API from './base'


class Lists extends API {
  CONFIG = {
    root: '/list',
    routes: {
      item_status: 'item_status',

      add_item: 'add_item',
      remove_item: 'remove_item',
      clear: 'clear',
    },
  }

  details = (pk, options = {}) => (
    super.retrieve(pk, options)
  )

  itemStatus = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.item_status, options)
  )

  GET = {
    details: this.details,
    itemStatus: this.itemStatus,
  }

  POST = {
    create: (options = {}) => (
      super.create(options)
    ),

    addItem: (pk, options = {}) => (
      super.detailRoute(pk, this.CONFIG.routes.add_item, options)
    ),

    removeItem: (pk, options = {}) => (
      super.detailRoute(pk, this.CONFIG.routes.remove_item, options)
    ),

    clear: (pk, options) => (
      super.detailRoute(pk, this.CONFIG.routes.clear, options)
    ),
  }

  DELETE = {
    delete: (pk, options = {}) => (
      super.destroy(pk, options)
    ),
  }
}

export default new Lists()
