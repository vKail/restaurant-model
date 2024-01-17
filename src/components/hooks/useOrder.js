import { useSelector, useDispatch } from "react-redux";
import {getAllOrders, createOrder, deleteOrder, updateOrder, getOrderById, updateItem, updateOrderState, addItemsOrder, updateOrderStateCancel} from "../services/orderService";
import { getOrder, addOrder, updateOrderRedux, getOrderByNumber, deleteOrderRedux } from "../../store/slices/orders/orderSlice";
import { resetProductCounts } from "../../store/slices/products/productSlice";

export const useOrder = () => {
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    const handlerGetOrders = async () => {
        try {
          const response = await getAllOrders();
          if (response.status === 200) {
            sessionStorage.setItem("id", JSON.stringify(response.data));
            dispatch(getOrder(response.data));
            dispatch(resetProductCounts());
          }
        } catch (error) {
          console.log(error); 
        }
      }

      const handlerGetOrdersById = async (id) => {
        try {
          const response = await getOrderById(id);
          if (response.status === 200) {
            dispatch(getOrderByNumber(response.data));
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
            dispatch(resetProductCounts());
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

      const handlerUpdateOrderStateCancel = async (id) => {
        try {
          const response = await updateOrderStateCancel(id);
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

    return { orders, handlerGetOrders, handlerCreateOrder, handlerDeleteOrder, handlerUpadateOrder, handlerGetOrdersById, handlerUpdateItem, handlerUpdateOrderState, handlerAddItemsOrder, handlerUpdateOrderStateCancel };
}