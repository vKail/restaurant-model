import axios from "axios";

export const getAllClients = async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/clients`);
;
    } catch (error) {
        console.log(error);
    }
}

export const getClientById = async (id) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/clients/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const createClient = async (client) => {
    try {
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/clients`, { client });
    } catch (error) {
        console.log(error);
    }
}

export const updateClient = async (id, client) => {
    try {
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/clients/${id}`, { client });
    } catch (error) {
        console.log(error);
    }
}