import {IRouteObj} from '../../src/@types/routes';

const defaultRoutes: IRouteObj[] = [
  {
    path: '/',
    exact: true,
    component: () => import(/* webpackPreload: true */ '../components/Main')
  },
  {
    path: '/start',
    exact: true,
    component: () => import('../components/Start')
  }
];

export default defaultRoutes;
