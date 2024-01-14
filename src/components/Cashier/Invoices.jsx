import { useEffect } from "react";
import { useOrder } from "../hooks/useOrder"
import { NavLink } from "react-router-dom";

const Invoices = () => {
    const { orders, handlerGetOrders } = useOrder();
    useEffect(() => {
        handlerGetOrders();
    }, []);
    const ordersFinished = orders.filter(order => order.order.status === 'finish');
    return (
        <div className="m-5">
        <h1 className="text-2xl font-bold mb-5">Invoices</h1>
        <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 border-b border-gray-300">Orden</th>
          <th className="px-4 py-2 border-b border-gray-300">Mesa</th>
          <th className="px-4 py-2 border-b border-gray-300">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ordersFinished.map((order) => (
          <tr key={order.order.order_number} className="border-b">
            <td className="px-4 py-2 m-2 border-b border-gray-300 font-bold h-12 align-middle">
              {order.order.order_number}
            </td>
            <td className="px-4 py-2 m-2 border-b border-gray-300 h-12 align-middle">
              {order.order.table_id}
            </td>
            <td className="px-4 py-2 m-2 border-b border-gray-300 h-12 align-middle">
              <NavLink 
                className="px-6 py-2 m-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                to={`/invoices/${order.order.order_number}`}
              >
                Facturar
              </NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    );
  };
  

export default Invoices