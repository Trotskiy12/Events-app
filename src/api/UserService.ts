import axios, {AxiosResponse} from 'axios'
import {IUser} from '../models/IUser'

export default class UserService {
    // сделаем функцию статичной, чтобы мы могли вызывать её без создания экземпляра класса
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return axios.get<IUser[]>('./user-data.json')
    }
}