export interface IRouteObj {
  path: string;
  exact: boolean;
  component: () => Promise<any>;
}
