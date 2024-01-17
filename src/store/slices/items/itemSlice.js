import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    item: {},
    loading: false,
    error: null,
};

export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
        setItem(state, action) {
            state.item = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        updateItemRedux(state, action) {
            const { id } = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items[index].state = "Enviado";
        },
    },
});

export const {
    setItems,
    setItem,
    setLoading,
    setError,
    updateItemRedux,
} = itemSlice.actions;