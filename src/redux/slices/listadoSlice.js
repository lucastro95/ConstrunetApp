import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listado: null
};

export const listadoSlice = createSlice({
  name: 'listado',
  initialState,
  reducers: {
    setListado: (state, action) => {
      state.listado = action.payload
    },
  },
});

export const { setListado } = listadoSlice.actions;
export default listadoSlice.reducer;