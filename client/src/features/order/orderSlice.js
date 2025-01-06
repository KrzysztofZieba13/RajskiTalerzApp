import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newOrderStep: 1,
  deliveryMethod: "",
  orderPriority: "asap",
  paymentMethod: "",
  tableNumber: "",
  orderOnDate: null,
  orderComment: "",
  billOption: "classic",
  clientData: {},
  deliveryData: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    incOrderStep(state) {
      if (state.newOrderStep <= 4) state.newOrderStep += 1;
    },
    decOrderStep(state) {
      if (state.newOrderStep > 1) state.newOrderStep -= 1;
    },
    setOrderStep(state, action) {
      if (action.payload >= 1 && action.payload <= 4)
        state.newOrderStep = action.payload;
    },
    setDeliveryMethod(state, action) {
      state.deliveryMethod = action.payload;
    },
    setOrderPriority(state, action) {
      state.orderPriority = action.payload;
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    setTableNumber(state, action) {
      state.tableNumber = action.payload;
    },
    setOrderOnDate(state, action) {
      state.orderOnDate = action.payload;
    },
    setOrderComment(state, action) {
      state.orderComment = action.payload;
    },
    setClientData(state, action) {
      state.clientData = { ...state.clientData, ...action.payload };
    },
    setDeliveryComment(state, action) {
      state.deliveryComment = action.payload;
    },
    setDeliveryData(state, action) {
      state.deliveryData = { ...state.deliveryData, ...action.payload };
    },
    setBillOption(state, action) {
      state.billOption = action.payload;
    },
    resetNewOrderData(state) {
      state.newOrderStep = 1;
      state.deliveryMethod = "";
      state.orderPriority = "asap";
      state.paymentMethod = "";
      state.tableNumber = "";
      state.orderOnDate = null;
      state.orderComment = "";
      state.billOption = "classic";
      state.clientData = {};
      state.deliveryData = {};
    },
  },
});

export const {
  incOrderStep,
  decOrderStep,
  setOrderStep,
  setDeliveryMethod,
  setOrderPriority,
  setPaymentMethod,
  resetNewOrderData,
  setTableNumber,
  setOrderOnDate,
  setOrderComment,
  setClientData,
  setDeliveryData,
  setBillOption,
} = orderSlice.actions;

export default orderSlice.reducer;
