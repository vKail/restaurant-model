import { useOrder } from "../hooks/useOrder";
import NavEmployes from "../Nav/NavEmployes";

const OrdersCreated = () => {
  const { orders } = useOrder();
  return (
    <div>
        <NavEmployes />
      <h1>OrdersCreated</h1>

    </div>
  );
}

export default OrdersCreated;