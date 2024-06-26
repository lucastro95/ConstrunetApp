// store/index.js
// redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import presupuestoReducer from './slices/presupuestoSlice.js';
import selectionsReducer from './slices/selectionsSlice.js';
import materialsReducer from "./slices/MaterialsSlice.js";
import proveedorReducer from "./slices/proveedorSlice.js";
import listadoReducer from "./slices/listadoSlice.js";

export const store = configureStore({
  reducer: {
    selecciones: selectionsReducer,
    presupuesto: presupuestoReducer,
    materials: materialsReducer,
    proveedor: proveedorReducer,
    listado: listadoReducer
  },


});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

