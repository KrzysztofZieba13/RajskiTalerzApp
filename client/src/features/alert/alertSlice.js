import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  seconds: 3,
  message: "",
  status: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      state.isVisible = true;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    hideAlert(state) {
      state.isVisible = false;
      state.message = false;
      state.status = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
