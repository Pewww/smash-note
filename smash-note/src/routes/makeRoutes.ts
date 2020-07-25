import {IRouteObj} from '../../src/@types/routes';
import lazy from './lazy';

const makeRoutes = (routes: IRouteObj[]) =>
  routes.map(route => ({
    ...route,
    component: lazy(route.component)
  }));

export default makeRoutes;
