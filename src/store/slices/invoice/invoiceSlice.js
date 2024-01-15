import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("id")) ||  {
    invoice: [],
    invoiceById: [],
};

export const invoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        invoice: initialState,
        invoiceById: [],
    },
    reducers: {
        setInvoice: (state, action) => {
            state.invoice = action.payload;
        },
        newInvoice: (state, action) => {
            state.invoice.push(action.payload);
        },
        updateInvoice: (state, action) => {
            const { id, newInvoice } = action.payload;
            const index = state.invoice.findIndex(invoice => invoice.id === id);
            if (index !== -1) {
                state.invoice[index] = newInvoice;
            }
        },
        deleteInvoice: (state, action) => {
            const { id } = action.payload;
            const index = state.invoice.findIndex(invoice => invoice.id === id);
            if (index !== -1) {
                state.invoice.splice(index, 1);
            }
        },
        setInvoiceById: (state, action) => {
            state.invoiceById = action.payload;
        }
    },
});

export const { setInvoice, newInvoice, updateInvoice, deleteInvoice, setInvoiceById } = invoiceSlice.actions;