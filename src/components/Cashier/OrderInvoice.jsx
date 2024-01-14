import { useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
const OrderInvoice = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarFormularioExistente, setMostrarFormularioExistente] = useState(true);

    // Función para cambiar la visibilidad de ambos formularios
    const toggleFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
        setMostrarFormularioExistente(!mostrarFormularioExistente);
    };
    const params = useParams();
    const orderId = params.orderId;
    // const orderId = useParams();
    const { orders, handlerGetOrdersById } = useOrder();
    const numericOrderId = parseInt(orderId, 10);
    useEffect(() => {
        handlerGetOrdersById(numericOrderId);
        console.log(orders, 45);
        console.log('NumeroParseado', numericOrderId);
        console.log('useParams', orderId);
        console.log(handlerGetOrdersById(parseInt(orderId)));
    }, [numericOrderId]);
    const orderDetails = useSelector(state => state.order.ordersById);
    if (!orderDetails || orderDetails.length === 0) {
        return <div>Cargando detalles de la orden...</div>;
    }

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="border rounded-lg w-5/6 p-10 m-14 bg-white shadow-lg">
                <h1 className="text-2xl font-bold mb-4">
                    Facturación de la Orden: {orderDetails.order.order_number}
                </h1>
                {mostrarFormularioExistente && (
                <div className="flex flex-row items-center justify-start m-2">
                    <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300 font-bold mr-2">Cliente</label>
                    <input
                        type="text"
                        placeholder="Cédula del cliente..."
                        className="block mt-0 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                    <button
                        className="px-6 py-2 ml-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    >
                        Seleccionar
                    </button>
                </div>
                )}
                <button
                    className="px-6 py-2 ml-2  m-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    onClick={toggleFormulario}
                >
                    Nuevo cliente
                </button>
                {mostrarFormulario && (
                    <div className="grid grid-cols-2 p-4 gap-x-4 m-2  border rounded-lg">
                        {/* Aquí van los campos para crear un nuevo cliente */}
                        <input
                            type="text"
                            placeholder="Cédula del cliente"
                            className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Coreo electrónico"
                            className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Dirección "
                            className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        />
                        <button
                            className="px-6 py-2 ml-2  m-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            onClick={toggleFormulario}
                        >
                            Crear cliente
                        </button>
                        {/* Más campos según sea necesario */}
                    </div>
                )}
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Producto</th>
                            <th className="px-4 py-2">Precio</th>
                            <th className="px-4 py-2">Cantidad</th>
                            <th className="px-4 py-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.items.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="px-4 py-2">{item.product.name}</td>
                                <td className="px-4 py-2">${item.product.price}</td>
                                <td className="px-4 py-2">{item.quantity}</td>
                                <td className="px-4 py-2">${item.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <select>
                    <option value="">Método de pago...</option>
                    <option value="">Efectivo</option>
                    <option value="">Transferencia</option>
                    <option value="">Tarjeta</option>
                    <option value="">PayPal</option>
                </select>
                <button className="px-6 py-2 m-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    Listo
                </button>
            </div>
        </div>
    )
}

export default OrderInvoice