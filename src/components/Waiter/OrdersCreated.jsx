import { useOrder } from "../hooks/useOrder";
import NavEmployes from "../Nav/NavEmployes";

const OrdersCreated = () => {
  const { orders } = useOrder();
  const storedLogin = localStorage.getItem("login");
  let employeeId = null;
  if (storedLogin) {
    const loginData = JSON.parse(storedLogin);
    employeeId = loginData.employee.id;
  }
  const ordersFiltered = orders.filter((order) => order.order.employee_id == employeeId);
  return (
      <div className="">
          <NavEmployes />
          <h1 className="p-6">Ordenes en espera</h1>
          <div className="grid grid-cols-4 w-full gap-5 p-5 " >
              {ordersFiltered.map((order) => (
                  <div className="border border-zinc-200 p-5 rounded-2xl shadow-2xl m-5 h-64 bg-science-blue-50" key={order.order_number}>
                      <p>Order Number: {order.order.order_number}</p>
                      <p>Status: {order.order.status}</p>
                      <p>Total: {order.order.total}</p>
                      <p>Table ID: {order.order.table_id}</p>
                      {Array.isArray(order.items) && order.items.map((item) => (
                          <div key={item.product.id}>
                              <p>Name: {item.product.name}</p>
                              <p>Description: {item.product.description}</p>
                              <p>Quantity: {item.quantity}</p>
                          </div>
                      ))}
                  </div>
              ))}
          </div>
      </div>
  );
}

export default OrdersCreated;