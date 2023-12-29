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

    },
   });
    
export const { getOrder, addOrder } = orderSlice.actions;