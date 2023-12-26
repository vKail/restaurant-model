import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { tableSlice } from "./slices/tables/tableSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        table: tableSlice.reducer
    },
});

export default store;