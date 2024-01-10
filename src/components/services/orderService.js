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

export const updateOrder = async (id) => {
    try{
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/orders/${id}/OrdenLista`);
    } catch (error) {
        throw error
    }
};

export const addItemsOrder = async (id, items_attributes) => {
    try{
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/orders/${id}/AgregarItem`, {items_attributes});
    } catch (error) {
        throw error
    }
};

export const updateOrderState = async (id) => {
    try{
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/orders/${id}/OrdenFinalizada`);
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

export const updateItem = async (id) => {
    try{
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/items/${id}/ActualizarEstado`);
    } catch (error) {
        throw error
    }
    
}