import { useOrder } from "../hooks/useOrder"

const Invoices = () => {
    const { orders, handlerGetOrders } = useOrder();
    const ordersFinished = orders.filter(order => order.order.status === 'finish');
    return (
        <div>
            <h1>Invoices</h1>
            <div className="lg:grid lg:grid-cols-4 lg:gap-4 m-5">
                {ordersFinished.map((order) => (
                    <div className=" p-5 my-5 rounded-2xl shadow-xl border border-yellow-300 bg-yellow-50" key={order.order_number}>
                        <p className="font-bold ">Orden {order.order.order_number}</p>
                        {/*<p>Estado: {order.order.status}</p>*/}
                        <p>Mesa: {order.order.table_id}</p>
                        {Array.isArray(order.items) && order.items.map((item) => (
                            <div key={item.product.id}>
                               <p>{item.product.name} x{item.quantity}</p>
                            </div>
                        ))}
                        <button className=" bg-white font-black p-4 m-2 transition duration-300 ease-in-out transform  hover:scale-110">
                            Facturar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Invoices