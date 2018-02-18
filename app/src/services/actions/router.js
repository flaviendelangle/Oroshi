import { notify } from 'services/titles/router'


export const notifyRouteChange = location => ({
  type: notify.change,
  route: location,
  meta: {
    common: true,
  }
});

export default null;
