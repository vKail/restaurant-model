import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../services/productsServices";
import { fetchProductsSuccess } from "../store/slice/products/productsSlice";

export const useProducts = () => {
    const { products, loading, error } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const handlerFetchAllProducts = () => {
        const data = getAllProducts();
        dispatch(fetchProductsSuccess(data));
    };

    return {
        products,
        loading,
        error,
        handlerFetchAllProducts,
    };
};