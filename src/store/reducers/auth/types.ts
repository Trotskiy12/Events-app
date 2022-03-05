import { IUser } from '../../../models/IUser';

export interface AuthState{
    isAuth: boolean,
    user: IUser,
    isLoading: boolean,
    error: string
}

export enum AuthActionEnum {
    SET_AUTH = 'SET_AUTH',
    SET_USER = 'SET_USER',
    SET_ERROR = 'SET_ERROR',
    SET_IS_LOADING = 'SET_IS_LOADING'
}

export interface SetAuthAction {
    type: AuthActionEnum.SET_AUTH;
    payload: boolean
}

export interface SetUserAction {
    type: AuthActionEnum.SET_USER;
    payload: IUser
}

export interface SetErrorhAction {
    type: AuthActionEnum.SET_ERROR;
    payload: string
}

export interface SetIsLoadinghAction {
    type: AuthActionEnum.SET_IS_LOADING;
    payload: boolean
}


export type AuthAction = 
    SetAuthAction 
    | SetErrorhAction 
    | SetIsLoadinghAction 
    | SetUserAction