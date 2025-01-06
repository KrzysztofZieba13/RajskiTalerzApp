import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: true,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    switchVisibility(state, action) {
      state.isVisible = action.payload;
    },
  },
});

export const { switchVisibility } = homeSlice.actions;

export default homeSlice.reducer;
