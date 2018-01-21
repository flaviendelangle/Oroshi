import { notify } from 'services/titles/router'


export const notifyRouteChange = location => ({
  type: notify.change,
  route: location,
});

export default null;
