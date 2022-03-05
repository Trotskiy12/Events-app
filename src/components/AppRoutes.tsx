import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import Event from '../pages/Event';
import { useTypedSelector } from '../hooks/useTypedSelector';
const AppRouter = () => {
    // получаем из state isAuth с помощью useTypedSelector
    const {isAuth} = useTypedSelector(state => state.auth)
    return (  
        isAuth
        ?
        <Routes>
            <Route path='/event' element={<Event/>} />
            {/* если путь не зарегестрирован происходит переход на страницу */}
            <Route path="/*" element={<Navigate replace to="/event" />} />
        </Routes>
        :
        
        <Routes>
            <Route path='/login' element={<Login/>} />
            {/* если путь не зарегестрирован происходит переход на страницу */}
            <Route path="/*" element={<Navigate replace to="/login" />} />
        </Routes>
    );
}

export default AppRouter;