import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./features/home/homeSlice";
import orderReducer from "./features/order/orderSlice";
import cartReducer from "./features/cart/cartSlice";
import alertReducer from "./features/alert/alertSlice";
import { api } from "./services/api";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    home: homeReducer,
    order: orderReducer,
    cart: cartReducer,
    alert: alertReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
