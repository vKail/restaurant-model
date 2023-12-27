import axios from "axios";


export const getAllProducts = async () => {
    try{
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/products`);
    } catch (error) {
        throw error
    }
    
};

export const getProductById = async (id) => {
    try{
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/products/${id}`);
    } catch (error) {
        throw error
    }
    
};

export const createProduct = async (product) => {
    try{
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/products`, {product});
    } catch (error) {
        throw error
    }
    
};

export const updateProduct = async (id, product) => {
    try{
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/products/${id}`, {product});
    } catch (error) {
        throw error
    }
    
};

export const deleteProduct = async (id) => {
    try{
        return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/products/${id}`);
    } catch (error) {
        throw error
    }
    
};

