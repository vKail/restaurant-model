import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("id")) || {
    clients: [],
    loading: false,
    error: null,
    clientById: [],
};

export const clientSlice = createSlice({
    name: "client",
    initialState: {
        clients: initialState,
        loading: false,
        error: null,
        clientById: [],
    },
    reducers: {
        clientRequest: (state) => {
            state.loading = true;
        },
        clientSuccess: (state, action) => {
            state.loading = false;
            state.clients = action.payload;
        },
        clientFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getClient: (state, action) => {
            state.clients = action.payload;
        },
        addClient: (state, action) => {
            state.clients.push(action.payload);
        },
        setClientById: (state, action) => {
            state.clientById = action.payload;
        },


    },
});

export const { clientRequest, clientSuccess, clientFail, getClient, addClient, setClientById } = clientSlice.actions;