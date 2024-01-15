import { useOrder } from "../hooks/useOrder";
import NavEmployes from "../Nav/NavEmployes";
import Swal from "sweetalert2";
import { useTables } from "../hooks/useTables";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useOrdersChannel2 } from "../hooks/useOrdersChanel2";

const OrdersCreated = () => {
    const navigate = useNavigate();
    const { orders, handlerDeleteOrder, handlerUpadateOrder, handlerGetOrders, handlerUpdateOrderState } = useOrder();
    const { handlerGetTablesById, handlerUpdateTableStatus } = useTables();
    const storedLogin = localStorage.getItem("login");
    let employeeId = null;
    if (storedLogin) {
        const loginData = JSON.parse(storedLogin);
        employeeId = loginData.employee.id;
    }
    const ordersFiltered = orders.filter((order) => order.order.employee_id == employeeId);
    useEffect(() => {
        handlerGetOrders();
    }, []);

    const optionsCheckUpdate = async (orderId, tableId) => {
        const { value: accept } = await Swal.fire({
            title: "¿Desea finalizar la orden?",
            input: "radio",
            inputOptions: {
                '1': 'Sí',
                '0': 'No'
            },
            inputValue: '1',
            confirmButtonText: `
        Continue&nbsp;<i class="fa fa-arrow-right"></i>
      `,
            inputValidator: (result) => {
                if (!result) {
                    return "Debes seleccionar una opción";
                }
            }
        });

        if (accept === '1') {
            Swal.fire("La orden será finalizada :)").then(() => {
                // Llama a la función para actualizar la orden si el usuario selecciona "Sí"
                handlerUpdateOrderState(orderId);
                handlerUpdateTableStatus(tableId, 'free');

            });
        } else if (accept === '0') {
            // Cierra el cuadro de diálogo si el usuario selecciona "No"
            Swal.close();
        }
    };

    const optionscheck = async (orderId, tableId) => {
        const { value: accept } = await Swal.fire({
            title: "Está seguro de eliminar la orden?",
            input: "radio",
            inputOptions: {
                '1': 'Sí',
                '0': 'No'
            },
            inputValue: '1',
            confirmButtonText: `
        Continue&nbsp;<i class="fa fa-arrow-right"></i>
      `,
            inputValidator: (result) => {
                if (!result) {
                    return "Debes seleccionar una opción";
                }
            }
        });

        if (accept === '1') {
            Swal.fire("Gracias por confirmar :)").then(() => {
                // Redirige a otra página si el usuario selecciona "Sí" // v6
                handlerDeleteOrder(orderId);
                handlerUpdateTableStatus(tableId, 'free');
                navigate(`/tables`);

            });
        } else if (accept === '0') {
            // Cierra el cuadro de diálogo si el usuario selecciona "No"
            Swal.close();
        }
    }
    const getOrderStatusText = (status) => {
        switch (status) {
            case 'in_process':
                return 'En proceso';
            case 'ready':
                return 'Lista';
            case 'finish':
                return 'Finalizada';
            default:
                return 'Estado desconocido';
        }
    };

    const ordersFilter = ordersFiltered.filter((order) => order.order.status !== 'billed');
    const ordersFilter2 = ordersFilter.filter((order) => order.order.status !== 'finish');

    return (
        <div className="">
            <NavEmployes />
            <h1 className="p-6 font-bold">Ordenes</h1>
            <div className="md:grid md:grid-cols-2 lg:grid lg:grid-cols-3  xl:grid xl:grid-cols-4 lg:gap-5 p-5 " >
                {ordersFilter2.map((order) => (
                    <div className="border border-zinc-200 p-5  rounded-2xl shadow-2xl m-5 w-12/12 box-border min-w-min" key={order.order.order_number}>
                        <a className=" font-bold">Orden {order.order.order_number}</a>
                        <p>Estado: {getOrderStatusText(order.order.status)}</p>
                        <p>Mesa: {order.order.table_id}</p>
                        {Array.isArray(order.items) && order.items.map((item) => (
                            <div key={item.product.id}>
                                <p>x{item.quantity} {item.product.name} </p>

                            </div>
                        ))}
                        <div className="flex flex-col md:flex md:flex-row justify-center">
                           
                            <button className='bg-yellow-600 text-white p-2 rounded-md m-1 md:m-0 transition duration-300 ease-in-out transform  hover:scale-110' onClick={() => optionsCheckUpdate(order.order.order_number, order.order.table_id)}>
                                Finalizar
                            </button>
                            <NavLink className='bg-green-600 text-white p-2 rounded-md md:m-0 m-1 transition duration-300 ease-in-out transform  hover:scale-110' to={`/ordersCreated/update/${order.order.order_number}`}>
                                Editar
                            </NavLink>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default OrdersCreated;