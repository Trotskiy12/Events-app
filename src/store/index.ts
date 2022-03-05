import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk'
import reducers  from './reducers';
const rootReducer = combineReducers(
    reducers
)

export const store = createStore(rootReducer, applyMiddleware(thunk))

// типизация state
// этот тип будет знать о reducer'ах, с которыми мы работаем
// и о тех данных, с которыми reducer работает
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch