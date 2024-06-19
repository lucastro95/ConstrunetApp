import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    proveedor: null
};

export const proveedorSlice = createSlice({
  name: 'proveedor',
  initialState,
  reducers: {
    setProveedor: (state, action) => {
      state.proveedor = action.payload
      console.log(state.proveedor);
    },
  },
});

export const { setProveedor } = proveedorSlice.actions;
export default proveedorSlice.reducer;