import { useOrder } from "../hooks/useOrder";
import { useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
import { useOrdersChannel2 } from "../hooks/useOrdersChanel2";

const OrdersCooks = () => {
    const { orders, handlerGetOrders, handlerUpdateItem, handlerUpadateOrder } = useOrder();
    //useOrdersChannel(handlerGetOrders);
    const [sortedOrders, setSortedOrders] = useState([]);
    const { handlerLogout } = useAuth();


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

    const checkOrderStatus = (order) => {
        console.log("Orden", order);
        const allItemsFinished = order.items.every(item => item.status === 'finished');
        if (allItemsFinished) {
            // Todos los ítems están 'finished', entonces actualizamos el estado de la orden
            handlerUpadateOrder(order.order.order_number);
        }
    };

    const updateItemStatus = async (itemId, orderId) => {
        handlerUpdateItem(itemId);
        checkOrderStatus(orderId);

    };
    const ordersInProcess = sortedOrders.filter(order => order.order.status === 'in_process');
    const ordersReady = sortedOrders.filter(order => order.order.status === 'ready');

    const isAnyItemPending = (order) => {
        return Array.isArray(order.items) && order.items.some(item => item.status === 'pending');
    };

    const handleOrderClick = (orderNumber, order) => {
        if (!isAnyItemPending(order)) {
            handlerUpadateOrder(orderNumber);
        }
    };

    return (
        <div className="">
            <div className="flex flex-row md:flex md:flex-row justify-between">
                <img className="h-14 m-2 rounded-lg" src="../../public/images/logo-restaurant.jpg" alt="" />
                <h1 className="p-6 font-bold">Ordenes</h1>
                <button className='bg-red-600 text-white border hover:bg-red-700 px-4 rounded-md m-5' onClick={() => handlerLogout()}>Salir</button>
            </div>

            <div className="grid grid-cols-2 gap-x-4 h-screen">
                <div className="flex flex-col space-y-2">
                    <h1 className="p-6 font-bold">Ordenes en proceso</h1>
                    <div className="lg:grid lg:grid-cols-2 lg:gap-2 m-5">
                        {ordersInProcess.map((order) => (
                            <div
                                key={order.order.order_number}
                                className={`p-5 my-5 rounded-2xl shadow-xl border border-green-300 bg-green-50 ${isAnyItemPending(order) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => handleOrderClick(order.order.order_number, order)}
                            >
                                <p>Orden {order.order.order_number}</p>
                                <p>Mesa: {order.order.table_id}</p>
                                <div className="flex flex-col">
                                {order.items.map((item) => (
                                    
                                        item.product.category !== 'gaseosas' && (
                                        <button
                                        key={item.product.id}
                                        className={`font-bold underline underline-offset-2 ${item.status === 'pending' ? 'decoration-red-500 text-red-500' : 'decoration-sky-500 text-sky-500'}`}
                                        onClick={() => updateItemStatus(item.id, order.order.order_number)}
                                        disabled={item.status !== 'pending'}>
                                        {item.product.name} x{item.quantity}
                                    </button>
                                        )
                                    
                                   
                                ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* La columna del medio tiene bordes en ambos lados */}
                <div className="border-l border-slate-400 flex flex-col space-y-2 ">
                    <h1 className="p-6 font-bold">Ordenes listas</h1>
                    {/* Contenido de la segunda columna */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-2 m-5">
                        {ordersReady.map((order) => (
                            <div className=" p-5 my-5 rounded-2xl shadow-xl border border-red-300 bg-red-50" key={order.order.order_number}>
                                <p className="font-bold ">Orden {order.order.order_number}</p>
                                {/*<p>Estado: {order.order.status}</p>*/}
                                <p>Mesa: {order.order.table_id}</p>
                                {Array.isArray(order.items) && order.items.map((item) => (
                                    <div key={item.product.id}>
                                        <button className={`font-bold underline underline-offset-2  ${item.status === 'pending' ? 'decoration-red-500 text-red-500' : 'decoration-sky-500 text-sky-500'} `} onClick={() => updateItemStatus(item.id, order.order.order_number)} disabled={item.status !== 'pending'}> {item.product.name} x{item.quantity}</button>

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default OrdersCooks;