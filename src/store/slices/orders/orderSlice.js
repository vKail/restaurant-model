import { createSlice } from "@reduxjs/toolkit";

const initialOrder = JSON.parse(localStorage.getItem("orders")) ||  [];

export const orderSlice = createSlice({
    name: "order",
   initialState: {
         orders: initialOrder,
    },
    reducers:{
        getOrder: (state, action) => {
            state.orders = action.payload;
            
    },
    addOrder: (state, action) => {
        state.orders.push(action.payload);
    },
    deleteOrderRedux: (state, action) => {
        const { id } = action.payload;
        const index = state.orders.findIndex(order => order.id === id);
        if (index !== -1) {
          state.orders.splice(index, 1);
        }
      },
    },
   });
    
export const { getOrder, addOrder, deleteOrderRedux } = orderSlice.actions;