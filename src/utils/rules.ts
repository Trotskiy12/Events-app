import moment, { Moment } from 'moment';

export const rules = {
    required: (message: string = 'Require parametr') => ({
        required: true, 
        message
    }),
    // добавляем правило, чтобы нельзя было создать событие на те даты, что уже прошли
    isDateAfter: (message:string) => () => ({
        // валидация на дату
        validator(_: any, value: Moment){
            // если дата раньше сегодняшнего дня -- ошибка
            if(value.isSameOrAfter(moment())) {
                return Promise.resolve()
            }
            return Promise.reject(new Error(message))
        }
    })
}