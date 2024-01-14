import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } from "../services/productServices";
import { getProductsRedux, getProductByIdRedux, addProductRedux, deleteProductRedux } from "../../store/slices/products/productSlice";
import { useNavigate } from "react-router-dom";


export const useProducts = () => {
    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerGetProducts = async () => {
        try {
          const response = await getAllProducts();
          if (response.status === 200) {
            dispatch(getProductsRedux(response.data));
            localStorage.setItem("products", JSON.stringify(response.data));
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

      const handlerAddProduct = (product) => {
        try {
          const response = createProduct(product);
          if (response.status === 200 || response.status === 201) {
            dispatch(addProductRedux(response.data));
            navigate("/admin/tableProducts");
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handlerDeleteProduct = (id) => {
        try {
          const response = deleteProduct(id);
          if (response.status === 200) {
            dispatch(deleteProductRedux(id));
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handlerUpdateProduct = (id, product) => {
        try {
          const response = updateProduct(id, product);
          if (response.status === 200) {
            dispatch(updateProductRedux(response.data));
            navigate("/admin/tableProducts");
          }
        } catch (error) {
          console.log(error);
        }
      }

    return { products, handlerGetProducts, handlerGetProductsById, handlerAddProduct, handlerDeleteProduct, handlerUpdateProduct};
}
