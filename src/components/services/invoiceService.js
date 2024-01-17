import axios from "axios";

export const getAllInvoices = async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoices`);
    } catch (error) {
        console.log(error);
    }
}

export const getInvoiceById = async (id) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoices/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const createInvoice = async (invoice) => {
    try {
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoices`, { invoice });
    } catch (error) {
        console.log(error);
    }
}

