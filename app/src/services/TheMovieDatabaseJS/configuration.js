import API from './base'


class Configuration extends API {
  CONFIG = {
    root: '/company',
    routes: {
      countries: 'countries',
      jobs: 'jobs',
      languages: 'languages',
      primary_translations: 'primary_translations',
      timezones: 'timezones',
    },
  }

  get = (options = {}) => (
    super.list(options)
  )

  countries = (options = {}) => (
    super.listRoute(this.CONFIG.routes.countries, options)
  )

  jobs = (options = {}) => (
    super.listRoute(this.CONFIG.routes.jobs, options)
  )

  languages = (options = {}) => (
    super.listRoute(this.CONFIG.routes.languages, options)
  )

  primaryTranslations = (options = {}) => (
    super.listRoute(this.CONFIG.routes.primary_translations, options)
  )

  timezones = (options = {}) => (
    super.listRoute(this.CONFIG.routes.timezones, options)
  )

  GET = {
    details: this.details,
    countries: this.countries,
    jobs: this.jobs,
    languages: this.languages,
    primaryTranslations: this.primaryTranslations,
    timezones: this.timezones,
  }
}

export default new Configuration()
