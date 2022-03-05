import Event from '../pages/Event';
import Login from '../pages/Login';

export interface IRoute {
    path: string,
    elements: any;
    exact?: boolean
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/event'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, elements: Login}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.EVENT, exact: true, elements: Event}
]
