import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slice/products/productsSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        
    },
});