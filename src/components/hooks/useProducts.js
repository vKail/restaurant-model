import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, getProductById } from "../services/productServices";
import { getProductsRedux, getProductByIdRedux } from "../../store/slices/products/productSlice";


export const useProducts = () => {
    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const handlerGetProducts = async () => {
        try {
          const response = await getAllProducts();
          if (response.status === 200) {
            dispatch(getProductsRedux(response.data));
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handlerGetProductsById = async (id) => {
        try {
          const response = await getProductById(id);
          if (response.status === 200) {
            dispatch(getProductByIdRedux(response.data));
          }
        } catch (error) {
          console.log(error);
        }
      }

    return { products, handlerGetProducts, handlerGetProductsById };
}
