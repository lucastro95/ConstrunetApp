// redux/slices/presupuestoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const presupuestoSlice = createSlice({
  name: 'presupuesto',
  initialState,
  reducers: {
    setPresupuesto: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPresupuesto } = presupuestoSlice.actions;
export default presupuestoSlice.reducer;
