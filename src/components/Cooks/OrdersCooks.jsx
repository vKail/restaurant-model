import { useOrder } from "../hooks/useOrder";
import { useState, useEffect } from "react";
import { useOrdersChannel } from "../hooks/useOrderChanel";

const OrdersCooks = () => {
    const { orders, handlerGetOrders } = useOrder();
    //useOrdersChannel(handlerGetOrders);
    const [sortedOrders, setSortedOrders] = useState([]);

    useEffect(() => {
        // Paso 2: Ordenar inmediatamente después de la obtención de datos
        const sorted = [...orders].sort((a, b) => {
            // Asegúrate de que las fechas se están creando correctamente
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateA - dateB;
        });

        // Paso 3: Revisar el estado después de la ordenación
        console.log('Ordenadas FIFO:', sorted);

        setSortedOrders(sorted);
    }, [orders]); // Dependencia del useEffect para que se ejecute cada vez que 'orders' cambie


    console.log(orders);
    return (
        <div className="grid grid-cols-2 gap-x-4 h-screen" > {/* Añadir espacio entre columnas con gap-x-4 */}
            <div className="flex flex-col space-y-2"> {/* Añadir espacio entre órdenes con space-y-2 */}
                <h1 className="p-6 font-bold"> Ordenes en proceso</h1>
                <div className="lg:grid lg:grid-cols-2 lg:gap-2 ">
                    {sortedOrders.map((order) => (
                        <div className=" p-5 my-5 rounded-2xl shadow-xl border border-green-300 bg-green-50" key={order.order_number}>
                            <p>Orden {order.order.order_number}</p>
                            {/*<p>Estado: {order.order.status}</p>*/}
                            <p>Mesa: {order.order.table_id}</p>
                            {Array.isArray(order.items) && order.items.map((item) => (
                                <div key={item.product.id}>
                                    <p className="font-bold underline decoration-sky-500">{item.product.name} x{item.quantity}</p>
                                    <p></p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            {/* La columna del medio tiene bordes en ambos lados */}
            <div className="border-l border-slate-400 flex flex-col space-y-2">
                <h1 className="p-6">Ordenes en proceso</h1>
                {/* Contenido de la segunda columna */}
            </div>
        </div>
    );
}

export default OrdersCooks;