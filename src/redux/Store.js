// store/index.js
// redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import presupuestoReducer from '../redux/slices/presupuestoSlice.js';
import selectionsReducer from '../redux/slices/selectionsSlice.js';

export const store = configureStore({
  reducer: {
    selecciones: selectionsReducer,
    presupuesto: presupuestoReducer,
  },
});

export default store;

