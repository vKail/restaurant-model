import { useSelector, useDispatch } from "react-redux";
import {getAllOrders, createOrder, deleteOrder, updateOrder, getOrderById, updateItem, updateOrderState, addItemsOrder} from "../services/orderService";
import { getOrder, addOrder, updateOrderRedux, getOrderByID, deleteOrderRedux } from "../../store/slices/orders/orderSlice";
import { productSlice } from "../../store/slices/products/productSlice";

export const useOrder = () => {
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    const handlerGetOrders = async () => {
        try {
          const response = await getAllOrders();
          if (response.status === 200) {
            sessionStorage.setItem("id", JSON.stringify(response.data));
            dispatch(getOrder(response.data));
          }
        } catch (error) {
          console.log(error); 
        }
      }

      const handlerGetOrdersById = async (id) => {
        try {
          const response = await getOrderById(id);
          if (response.status === 200) {
            // Asegúrate de que estás despachando la orden correcta
            dispatch(getOrderByID(response.data.order));
            // Actualiza el recuento de productos
            response.data.order.items.forEach(item => {
              dispatch(setProductCount({
                productId: item.product.id, // Esto asume que tu producto tiene una propiedad 'id'
                count: item.quantity
              }));
            });
            return response.data.order;
          }
          
        } catch (error) {
          console.log(error);
        }
      };

      const handlerCreateOrder = async (newOrder) => {
        try {
          const response = await createOrder(newOrder);
          if (response.status === 200) {
            dispatch(addOrder(response.data));
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handlerDeleteOrder = async (id) => {
        try {
          const response = await deleteOrder(id);
          if (response.status === 200) {
            dispatch(deleteOrderRedux(id));
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handlerUpadateOrder = async (id) => {
        try {
          const response = await updateOrder(id);
          if (response.status === 200) {
            dispatch(updateOrderRedux({id}));
            handlerGetOrders();
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handlerAddItemsOrder = async (id, items_attributes) => {
        try {
          const response = await addItemsOrder(id, items_attributes);
          if (response.status === 200) {
            dispatch(updateOrderRedux({id}));
            handlerGetOrders();
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handlerUpdateOrderState = async (id) => {
        try {
          const response = await updateOrderState(id);
          if (response.status === 200) {
            dispatch(updateOrderRedux({id}));
            handlerGetOrders();
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handlerUpdateItem = async (id) => {
        try {
          const response = await updateItem(id);
          if (response.status === 200) {
            dispatch(updateOrderRedux({id}));
            handlerGetOrders();
          }
        } catch (error) {
          console.log(error);
        }
      }

    return { orders, handlerGetOrders, handlerCreateOrder, handlerDeleteOrder, handlerUpadateOrder, handlerGetOrdersById, handlerUpdateItem, handlerUpdateOrderState, handlerAddItemsOrder };
}