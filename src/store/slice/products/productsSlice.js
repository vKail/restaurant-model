import { createSlice } from "@reduxjs/toolkit";


export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchProducts: (state) => {
            state.loading = true;
        },
        fetchProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        fetchProductsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchProducts, fetchProductsSuccess, fetchProductsFail
} = productsSlice.actions;