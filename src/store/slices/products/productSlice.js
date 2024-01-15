import { createSlice } from "@reduxjs/toolkit";

const initialProductState =  JSON.parse(localStorage.getItem("products")) || {
    products: [],
    product: undefined,
    loading: false,
    error: undefined,
};

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: initialProductState,
        productById: [],
    },
    reducers: {
        getProductsRedux: (state, action) => {
            // Asumiendo que cada producto del backend no tiene un campo 'count'
            state.products = action.payload.map(product => ({
                ...product,
                count: 0 // Inicializa el contador en 0
            }));
        },
        getProductByIdRedux: (state, action) => {
            state.productById = action.payload;
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
        incrementProductCount: (state, action) => {
            const product = state.products.find(p => p.id === action.payload.productId);
            if (product) {
                product.count += 1;
            }
        },
        decrementProductCount: (state, action) => {
            const product = state.products.find(p => p.id === action.payload.productId);
            if (product && product.count > 0) {
                product.count -= 1;
            }
        },
        setProductCount: (state, action) => {
            const { productId, count } = action.payload;
            const productIndex = state.products.findIndex(product => product.id === productId);
            if (productIndex !== -1) {
                state.products[productIndex].count = count;
            }
        },
        updateProductRedux: (state, action) => {
            const { id, newStatus } = action.payload;
            const index = state.products.findIndex(product => product.id === id);
            if (index !== -1) {
                state.products[index].status = newStatus;
            }
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
    incrementProductCount,
    decrementProductCount,
    setProductCount,
    updateProductRedux,
} = productSlice.actions;