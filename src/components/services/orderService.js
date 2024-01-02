import  axios  from "axios";

export const getAllOrders = async () => {
    try{
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/orders`);
    } catch (error) {
        throw error
    }
    
};

export const getOrderById = async (id) => {
    try{
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/orders/${id}`);
    } catch (error) {
        throw error
    }
    
};

export const createOrder = async (order) => {
    try{
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/orders`, {order});
    } catch (error) {
        throw error
    }
    
};

export const updateOrder = async (id, order) => {
    try{
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/orders/${id}`, {order});
    } catch (error) {
        throw error
    }


    
};

export const deleteOrder = async (id) => {
    try{
        return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/orders/${id}`);
    } catch (error) {
        throw error
    }
    
};