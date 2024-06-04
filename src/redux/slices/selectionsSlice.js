import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tiempoEntrega: false,
  menorPrecio: false,
  reputacion: false,
  calidadMateriales: false,
};

export const selectionsSlice = createSlice({
  name: 'selecciones',
  initialState,
  reducers: {
    setSelecciones: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSelecciones } = selectionsSlice.actions;
export default selectionsSlice.reducer;
