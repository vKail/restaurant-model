import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { tableSlice } from "./slices/tables/tableSlice";
import { productSlice } from "./slices/products/productSlice";
import { orderSlice } from "./slices/orders/orderSlice";
import { employeeSlice } from "./slices/employee/employeeSlice";
import { clientSlice } from "./slices/clients/clientSlice";
import { invoiceSlice } from "./slices/invoice/invoiceSlice";
import { itemSlice } from "./slices/items/itemSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        table: tableSlice.reducer,
        product: productSlice.reducer,
        order: orderSlice.reducer,
        employee: employeeSlice.reducer,
        client: clientSlice.reducer,
        invoice: invoiceSlice.reducer,
        item: itemSlice.reducer,
    },
});

export default store;