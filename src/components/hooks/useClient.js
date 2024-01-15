import { getClient, setClientById, addClient } from "../../store/slices/clients/clientSlice";
import { getAllClients, getClientById, createClient } from "../services/clientService";
import { useSelector, useDispatch } from "react-redux";

export const useClient = () => {
    const { clients } = useSelector((state) => state.client);
    const dispatch = useDispatch();

    const handlerGetClients = async () => {
        try {
            const response = await getAllClients();
            if (response.status === 200) {
                sessionStorage.setItem("id", JSON.stringify(response.data));
                dispatch(getClient(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlerGetClientById = async (id) => {
        try {
            const response = await getClientById(id);
            if (response.status === 200) {
                dispatch(setClientById(response.data));
                handlerGetClients();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlerCreateClient = async (client) => {
        try {
            const response = await createClient(client);
            if (response.status === 200 || response.status === 201) {
                dispatch(addClient(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        handlerGetClients,
        handlerGetClientById,
        handlerCreateClient,
        clients
    }
}
