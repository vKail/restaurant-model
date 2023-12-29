import { useOrder } from "../hooks/useOrder";
import { useSelector } from "react-redux";

const OrderWaiters = () => {
    const { orders } = useOrder();
    return (
        <div>
            {orders.map((order) => (
                <div key={order.order_number}>
                    <p>{order.order_number}</p>
                    <p>{order.status}</p>
                    <p>{order.total}</p>
                    <p>{order.tableId}</p>
                </div>
            ))}
        </div>
    );
}

export default OrderWaiters;