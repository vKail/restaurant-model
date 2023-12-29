import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { tableSlice } from "./slices/tables/tableSlice";
import { productSlice } from "./slices/products/productSlice";
import { orderSlice } from "./slices/orders/orderSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        table: tableSlice.reducer,
        product: productSlice.reducer,
        order: orderSlice.reducer,
    },
});

export default store;