import { useOrder } from "../hooks/useOrder";

const OrdersCooks = () => {
    const { orders } = useOrder();
    console.log(orders);
    return (
        <div className="grid grid-cols-3 gap-x-4 h-screen" > {/* Añadir espacio entre columnas con gap-x-4 */}
            <div className="flex flex-col space-y-2"> {/* Añadir espacio entre órdenes con space-y-2 */}
            <h1 className="p-6"> Ordenes en espera</h1>
            {orders.map((order) => (
                <div className="border border-zinc-200 p-5 rounded-2xl shadow-inner" key={order.order_number}>
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
            {/* La columna del medio tiene bordes en ambos lados */}
            <div className="border border-slate-400 flex flex-col space-y-2">
            <h1 className="p-6">Ordenes en proceso</h1>
                {/* Contenido de la segunda columna */}
            </div>
            {/* La tercera columna solo necesita un borde a la izquierda si se desea separarla de la segunda columna */}
            <div className="">
            <h1 className="p-6">Ordenes terminadas</h1>
                {/* Contenido de la tercera columna */}
            </div>
        </div>
    );
}

export default OrdersCooks;