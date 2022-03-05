import React, {FC, useEffect} from 'react';
import AppRouter from './components/AppRoutes';
import Navbar from './components/Navbar';
import { Layout } from 'antd';
import './App.css'
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';

const App: FC = () => {
  const {setUser, setIsAuth} = useActions()
  // убираем проблему: логин произошёл -- перегрузили страницу -- вернулись на страницу логина
  // так как привязки к сереву нет, то проверяем есть ли в localStore имя пользователя
  useEffect(() => {
    if(localStorage.getItem('auth')){
      setUser({username: localStorage.getItem('username' || '')} as IUser)
      setIsAuth(true)
    }
  }, []) // массив зависимостей пустой, чтобы хук отработал единожды

  return (
    <Layout >
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
}

export default App;
