import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } from "../services/productServices";
import { getProductsRedux, getProductByIdRedux, addProductRedux, deleteProductRedux, updateProductRedux } from "../../store/slices/products/productSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


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

      const handlerAddProduct = async (product) => {
        try {
          const response = await createProduct(product);
          if (response.status === 200 || response.status === 201) {
            localStorage.setItem("product", JSON.stringify(response.data));
            dispatch(addProductRedux(response.data));
            handlerGetProducts();
            navigate("/admin/tableProducts");
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handlerDeleteProduct = async (id) => {
        try {
          const response = await Swal.fire({
            title: "¿Estas seguro?",
            text: "No podras revertir esta accion!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
          if (response.isConfirmed) {
            const response = deleteProduct(id);
            if (response.status === 200) {
              dispatch(deleteProductRedux({ id }));
              handlerGetProducts();
            }
          } else if (response.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelado", "Tu producto esta a salvo :)", "error");
          }

        } catch (error) {
          console.log(error);
          Swal.fire("Error", "No se pudo eliminar el producto", "error");
        }
      }

      const handlerUpdateProduct = async (id, product) => {
        try {
          const response = await updateProduct(id, product);
          if (response.status === 200) {
            dispatch(updateProductRedux(response.data));
            handlerGetProducts();
            navigate("/admin/tableProducts");
          }
        } catch (error) {
          console.log(error);
        }
      }

    return { products, handlerGetProducts, handlerGetProductsById, handlerAddProduct, handlerDeleteProduct, handlerUpdateProduct};
}
