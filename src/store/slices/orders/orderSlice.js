import { createSlice } from "@reduxjs/toolkit";

const initialOrder = JSON.parse(localStorage.getItem("orders")) || [];

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: initialOrder,
    ordersById: [],
  },
  reducers: {
    getOrder: (state, action) => {
      state.orders = action.payload;

    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    deleteOrderRedux: (state, action) => {
      const { order_number } = action.payload;
      const index = state.orders.findIndex(order => order.order_number === order_number);
      if (index !== -1) {
        state.orders.splice(index, 1);
      }
    },
    updateOrderRedux: (state, action) => {
      const { order_number, newStatus } = action.payload;
      const index = state.orders.findIndex(order => order.order_number === order_number);
      if (index !== -1) {
        state.orders[index].status = newStatus;
      }
    },
    getOrderByNumber: (state, action) => {
      state.ordersById = action.payload;
    },
    
  },
});

export const { getOrder, addOrder, deleteOrderRedux, updateOrderRedux, getOrderByNumber } = orderSlice.actions;