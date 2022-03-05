import { AppDispatch } from '../..';
import { IEvent } from '../../../models/IEvent';
import { IUser } from '../../../models/IUser';
import { EventActionEnum, SetEventsAction, SetGuestsAction } from './types';
import UserService from '../../../api/UserService';

export const EventActionCreators = {
    // функция которая получает пользователя и происходит вызов SET_USER дальше такой же принцип
    // Это синхронные action-creator которые изменяют state
    setGuests: (payload: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    // асинхронная функция -- получаем список гостей
    fetchGuests: () =>  async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers()
            dispatch(EventActionCreators.setGuests(response.data));
        } catch (e) {
            console.log(e);
        }
    },
    // асинхронная функция, которая создаёт события
    createEvent: (event: IEvent) => async (dispacth: AppDispatch) => {
        try{
            // имитация работы с сервером -- всё храним в локальном state
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            json.push(event)
            dispacth(EventActionCreators.setEvents(json))
            localStorage.setItem('events', JSON.stringify(json))
        } catch(e){
            console.log(e)
        }
    },
    // асихнронная функция для получения списка событий -- также с имитацией работы сервера
    fetchEvents: (user: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            // получаем события для текущего пользователя
            // проверка на гость он или автор
            const currentUserEvents = json.filter(event => event.author === user || event.guest === user)
            dispatch(EventActionCreators.setEvents(currentUserEvents))
        } catch (e) {
            console.log(e)
        }
    }
}