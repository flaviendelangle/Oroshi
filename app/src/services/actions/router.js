import { notify } from '../titles/router'


// eslint-disable-next-line import/prefer-default-export
export const notifyRouteChange = location => ({
  type: notify.change,
  route: location,
  meta: {
    common: true,
  },
})
