import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllInvoices, getInvoiceById, createInvoice } from "../services/invoiceService";
import { setInvoice, newInvoice, setInvoiceById } from "../../store/slices/invoice/invoiceSlice";

export const useInvoice = () => {
    const navigate = useNavigate();
    const { invoice } = useSelector((state) => state.invoice);
    const dispatch = useDispatch();

    const handlerGetInvoices = async () => {
        try {
            const response = await getAllInvoices();
            if (response.status === 200) {
                localStorage.setItem("id", JSON.stringify(response.data));
                dispatch(setInvoice(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlerGetInvoiceById = async (id) => {
        try {
            const response = await getInvoiceById(id);
            if (response.status === 200 || response.status === 201) {
                dispatch(setInvoiceById(response.data));
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlerCreateInvoice = async (invoice) => {
        try {
            const response = await createInvoice(invoice);
            if (response.status === 200 || response.status === 201) {
                dispatch(newInvoice(response.data));
                navigate("/admin/tableInvoices");
            }
        } catch (error) {
            console.log(error);
        }
    }





    return {
        handlerGetInvoices,
        handlerGetInvoiceById,
        handlerCreateInvoice,
        invoice
    }
}
