// ActionCreator -- это просто функция, которая принмает какой-то аргумент и возвращает объект
import { AuthActionEnum, SetUserAction, SetAuthAction, SetIsLoadinghAction, SetErrorhAction } from './types';
import { IUser } from '../../../models/IUser';
import { AppDispatch } from '../..';
import UserService from '../../../api/UserService';
export const AuthActionCreators = {
    // функция которая получает пользователя и происходит вызов SET_USER дальше такой же принцип
    // Это синхронные action-creator которые изменяют state
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadinghAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorhAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    // Далее будут асинхронные -- которое уже отвечают за логику
    // Для того чтобы использовать redux-thunk нам нужно вернуть функцию, которая будет получать dispatch в качестве параметра

    // асинхронная функция для логина
    login:(username: string, password: string) => async (dispatch: AppDispatch) => {
        try{
            // имитация работы сервера -- используем localStorage
            dispatch(AuthActionCreators.setIsLoading(true))
            setTimeout( async () => {
                const response = await UserService.getUsers()
                // хард-код проверки на логин и пароль, так как нет сервера
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                if(mockUser){
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(AuthActionCreators.setUser(mockUser))
                    dispatch(AuthActionCreators.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError('Login or password uncorrect'))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            }, 1000)
        } catch (err){
            dispatch(AuthActionCreators.setError('error with login'))
        }
    },

    logout:() => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}