import axios from "axios";
export const getAllItems = async () => {
    try{
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/items`);
    } catch (error) {
        throw error
    }
    
}

