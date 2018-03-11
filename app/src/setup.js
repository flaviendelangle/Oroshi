import injectTapEventPlugin from 'react-tap-event-plugin'
import WebFont from 'webfontloader'
import { DEFAULT_LANGUAGE } from './services/languages'
import tM from './services/content/type'
import tmdbApi from './services/TheMovieDatabaseJS/base'
import movies from './types/movies'


/**
 * Remove touch detail issues
 */
injectTapEventPlugin()

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
  status: 'SUCCESS',
}
