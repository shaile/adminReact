import React from 'react';
import ReactDOM from 'react-dom';
import configureStore  from "./store/ConfigureStore";
import { Provider } from 'react-redux';  
import App from './App';

const store = configureStore();
const jsx = (
    <Provider store={store}>
      <App />
    </Provider>
  );

ReactDOM.render(jsx, document.getElementById('root'));
