import axios from "axios"

export const sign_in = async (employee) => {
    try {
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/employees/sign_in`, { employee })
    } catch (error) {
        throw error
    }
}

export const sign_out = async (employee ) => {
    try {
        return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/employees/sign_out`, {employee })
    } catch (error) {
        throw error
    }
}