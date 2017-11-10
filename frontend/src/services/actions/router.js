import { notify } from 'services/titles/router'

export const notifyRouteChange = location => {
  return {
    type: notify.change,
    route: location
  }
};