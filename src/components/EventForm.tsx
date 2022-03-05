import React, { FC } from 'react'
import { Form, Input, DatePicker, Button, Select} from 'antd';
import { rules } from '../utils/rules';
import { IUser } from '../models/IUser';
import { useState } from 'react';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void,
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)

    const {user} = useTypedSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        // нужна проверка, так как помимо Moment может вернуться null
        if (date){
            setEvent({...event, date: formatDate(date?.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Описание события"
                name="description"
                // правила поведения Input
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                />
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                // правила поведения Input
                rules={[rules.required(), rules.isDateAfter('Нельзя создать событие на прошедшую дату')]}
            >
                <DatePicker 
                    onChange={(date) => selectDate(date)}
                    
                />
            </Form.Item>
            <Form.Item
                label="Гости"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest => 
                        <Select.Option key={guest.username} value={guest.username}>
                           {guest.username} 
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Создать событие
                </Button>
            </Form.Item>


        </Form>
    )
}

export default EventForm;