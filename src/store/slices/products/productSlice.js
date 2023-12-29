import { createSlice } from "@reduxjs/toolkit";

const initialProductState =  JSON.parse(localStorage.getItem("products")) || {
    products: [],
    product: undefined,
    loading: false,
    error: undefined,
};

export const productSlice = createSlice({
    name: "product",
    initialState: initialProductState,
    reducers: {
        getProductsRedux: (state, action) => {
            state.products = action.payload;
        },
        getProductByIdRedux: (state, action) => {
            state.product = action.payload;
        },
        addProductRedux: (state, action) => {
            state.products.push(action.payload);
        },
        deleteProductRedux: (state, action) => {
            const { id } = action.payload;
            state.products = state.products.filter(
                (product) => product.id !== id
            );
        },
        setLoadingRedux: (state, action) => {
            state.loading = action.payload;
        },
        setErrorRedux: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    getProductsRedux,
    getProductByIdRedux,
    addProductRedux,
    deleteProductRedux,
    setLoadingRedux,
    setErrorRedux,
} = productSlice.actions;