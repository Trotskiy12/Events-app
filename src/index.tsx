import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import {
  BrowserRouter
} from "react-router-dom";
import { store } from './store/index';

ReactDOM.render(
  // создание обертки на App для подключения Redux
  <Provider store={store}>
    {/* создание обертки для react-router-dom */}
    <BrowserRouter>
      <App />
    </BrowserRouter >
  </Provider>,
  document.getElementById('root')
);
