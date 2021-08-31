import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './stylesheet.css';
import WeatherChacha from './weather.chacha';

ReactDOM.render(
    <Provider store={store}>
        <WeatherChacha />
    </Provider>,
    document.getElementById('chacha-root'),
);
