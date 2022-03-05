import React, {FC} from 'react'
import {Form, Input, Button} from 'antd'
import { rules } from '../utils/rules'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useInput } from '../hooks/useInput';
import { useActions } from '../hooks/useActions';
const LoginForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth) 
    const username = useInput('')
    const password = useInput('')

    // используем хук, который возвращает все action creators
    const {login} = useActions()

    const submit = () => {
        // теперь мы можем вызывать dispatch на action таким образом
        login(username.value, password.value)
    }


    return (
        <Form
            // функция вызывается когда форма заполнена и нажата кнопка 
            onFinish={submit}
        >
            {error && <div style={{color: 'red'}}>
                {error}
            </div>
            }       
            <Form.Item
                label="Username"
                name="username"
                // правила поведения Input
                rules={[rules.required('Please input your username!')]}
            >
                <Input {...username}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password')]}
            >
                <Input {...password} type="password"/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm