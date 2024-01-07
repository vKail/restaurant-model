import axios from "axios";

export const getAllTables = async () => {
    try{
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tables`);

    } catch (error) {
        throw error
    }
}


export const getTableById = async (id) => {
    try{
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tables/${id}`);

    } catch (error) {
        throw error
    }
}

export const updateTableStatus = async (id, status) => {
    try{
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tables/${id}`, {status});

    } catch (error) {
        throw error
    }
}