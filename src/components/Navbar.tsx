import React, {FC} from 'react'
import {Layout, Row, Menu} from 'antd'
import {useNavigate} from 'react-router-dom'
import { RouteNames } from '../routes/index';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
const Navbar: FC = () => {
    const navigate = useNavigate()
    const {isAuth, user} = useTypedSelector(state => state.auth)
    const {logout} = useActions()
    return ( 
        <Layout.Header>
            <Row justify="end">
                {
                isAuth
                ? 
                <>
                <div style={{color: 'white'}}>
                    {user.username}
                </div>
                <Menu theme="dark" mode="horizontal" selectable={false}>
                    <Menu.Item 
                        onClick={() => logout()} 
                        key={1}
                    >
                        Выйти
                    </Menu.Item>
                </Menu>
                </>
                :
                <>
                <div>
                    1
                </div>
                <Menu theme="dark" mode="horizontal" selectable={false}>
                    <Menu.Item 
                        onClick={() => navigate(RouteNames.LOGIN)} 
                        key={1}
                    >
                        Логин
                    </Menu.Item>
                </Menu>
                </>
                }
            </Row>
        </Layout.Header>
    );
}

export default Navbar;