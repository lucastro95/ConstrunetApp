import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMaterials: [],
};

const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    addMaterial: (state, action) => {
      const existingMaterial = state.selectedMaterials.find(
        (material) => material.id === action.payload.id
      );
      if (existingMaterial) {
        existingMaterial.quantity += 1;
      } else {
        state.selectedMaterials.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const material = state.selectedMaterials.find(
        (material) => material.id === action.payload.id
      );
      if (material) {
        material.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addMaterial, updateQuantity } = materialsSlice.actions;

export default materialsSlice.reducer;