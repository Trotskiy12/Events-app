// форматирование даты из объекта Moment
export const formatDate = (date: Date): string => {
    // получаем год
    const year = date.getFullYear();
    // получаем месяц. если число месяца меньше 10 добавим ноль
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    // получаем день. если число дня меньше 10 добавим ноль
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    // склеим дату 2000.02.02
    return `${year}.${month}.${day}`
}