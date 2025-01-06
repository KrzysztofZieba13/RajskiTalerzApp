import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload);
      item.quantity++;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload);
      item.quantity--;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.itemId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  selectors: {
    selectCartLength: (state) => state.cart.length,
  },
});

export const {
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;

export const { selectCartLength } = cartSlice.selectors;

export default cartSlice.reducer;
