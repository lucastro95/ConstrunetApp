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
        (material) => material._id === action.payload._id
      );
      if (existingMaterial) {
        existingMaterial.quantity += 1;
      } else {
        state.selectedMaterials.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const material = state.selectedMaterials.find(
        (material) => material._id === action.payload._id
      );
      if (material) {
        material.quantity = action.payload.quantity;
      }
    },
    deleteMaterial: (state, action) => {
      state.selectedMaterials = state.selectedMaterials.filter(
        (material) => material._id !== action.payload
      );
    }
  },
});

export const { addMaterial, updateQuantity, deleteMaterial } = materialsSlice.actions;

export default materialsSlice.reducer;