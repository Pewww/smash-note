import {IRouteObj} from '../../src/@types/routes';

// @TODO: import, dynamic import 구문 적용 시 비교하여 개선하기
const defaultRoutes: IRouteObj[] = [
  {
    path: '/',
    exact: true,
    component: () => import('../components/Main')
  },
  {
    path: '/start',
    exact: true,
    component: () => import('../components/Start')
  }
];

export default defaultRoutes;
