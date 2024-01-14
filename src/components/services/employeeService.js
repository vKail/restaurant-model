import axios from "axios";

export const getAllEmployees = async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employees`);
    } catch (error) {
        throw error;
    }
    }

export const getEmployeeById = async (id) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employees/${id}`);
    } catch (error) {
        throw error;
    }
    }

export const editEmployee = async (id, employee) => {
    try {
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employees/${id}`, {employee});
    } catch (error) {
        throw error;
    }
    }

export const newEmployee = async (employee) => {
    try {
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employees`, { employee });
    } catch (error) {
        throw error;
    }
    }

export const removeEmployee = async (id) => {
    try {
        return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employees/${id}`);
    } catch (error) {
        throw error;
    }
    }


