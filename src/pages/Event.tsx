import React, {FC, useState} from 'react'
import EventCalendar from '../components/EventCalendar';
import {Row, Button, Modal, Layout} from 'antd'
import EventForm from '../components/EventForm';
import {useEffect} from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event: FC = () => {
    const [modalVisible, setVisible] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state => state.event)
    const {user} = useTypedSelector(state => state.auth)
    // при первом запуске вызываем функции для получения событий и гостей
    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, []) // срабатывает один раз, так как передали путой массив зависимостей

    // функция, которая при нажатии на кнопку создания события -- закрывает модельное окно и вызывает создание события
    const addNewEvent = (event: IEvent) => {
        setVisible(false)
        createEvent(event)
    }

    return (
        <div>
            <Layout>
            <EventCalendar events={events}/>
            <Row justify="center">
                <Button onClick={() => setVisible(true)}>Добавить событие</Button>
            </Row>
            <Modal
                title = "Добавить событие"
                visible = {modalVisible}
                footer = {null}
                onCancel = {() => setVisible(false)} 
            >
                {/* так как форма переиспользуемая лучше вынести логику submit выше */}
                <EventForm 
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
            </Layout>
        </div>
    )
}

export default Event;