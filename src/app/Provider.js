// src/app/Provider.js
"use client"; // Asegúrate de que este archivo se ejecute en el cliente

import { Provider } from 'react-redux';
import store from '../redux/Store';

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
