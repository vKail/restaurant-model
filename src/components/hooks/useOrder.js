import { useSelector, useDispatch } from "react-redux";
import {getAllOrders, createOrder} from "../services/orderService";
import { getOrder, addOrder } from "../../store/slices/orders/orderSlice";

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

    return { orders, handlerGetOrders, handlerCreateOrder };
}