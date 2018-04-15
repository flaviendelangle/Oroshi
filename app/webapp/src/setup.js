import injectTapEventPlugin from 'react-tap-event-plugin'
import WebFont from 'webfontloader'
import ApolloClient from 'apollo-boost'

import { DEFAULT_LANGUAGE } from './services/languages'
import tM from './services/content/type'
import tmdbApi from '../../common/TheMovieDatabaseJS/base'
import movies from '../../common/plugins/movies/webapp/index'
import { DEV, GRAPHQL } from './config'


/**
 * Remove touch detail issues
 */
injectTapEventPlugin()

/**
 * Connect to the GraphQL server
 */
export const client = new ApolloClient(GRAPHQL)


/**
 * Font settings
 */
WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif'],
  },
})

/**
 * Public APIs settings
 */
tmdbApi.setConfig({
  api_key: 'de7ff1a87f9afdb1ccd29ad9a0738e31',
  language: DEFAULT_LANGUAGE,
  include_adult: 'false',
})

/**
 * Types registration
 */
tM.register(movies)

export default {
  run: (React) => {
    if (DEV.whyDidYouUpdate) {
      const { whyDidYouUpdate } = require('why-did-you-update') // eslint-disable-line global-require
      whyDidYouUpdate(React)
    }
  },
}
