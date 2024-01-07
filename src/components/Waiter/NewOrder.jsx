import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavEmployes from '../Nav/NavEmployes';
import OrderWaiters from '../Waiter/OrdersWaiters';
import { useOrder } from '../hooks/useOrder';
import { useTables } from '../hooks/useTables';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { tableId } = useParams();
    const products = useSelector(state => state.product.products); // Estado de productos de Redux
    const { handlerCreateOrder } = useOrder(); // Asume que es una función para enviar la orden
    const { handlerUpdateTableStatus } = useTables(); // Asume que es una función para actualizar el estado de la mesa
    const selectedTable = useSelector((state) =>
        state.table.tables.find(table => table.id.toString() === tableId) // Suponiendo que id es un número
    );

    const enviarOrdenCompleta = () => {
        const selectedProducts = products.filter(product => product.count > 0);

        if (selectedProducts.length === 0) {
            toast.error("No hay productos seleccionados");
            console.log('No hay productos seleccionados');
            return;
        }

        const storedLogin = localStorage.getItem("login");
        let employeeId = null;
        if (storedLogin) {
            const loginData = JSON.parse(storedLogin);
            employeeId = loginData.employee.id;
        }

        const order = {
            date: new Date().toISOString().slice(0, 10),
            table_id: parseInt(tableId, 10),
            employee_id: employeeId,
            items_attributes: selectedProducts.map(({ id, count }) => ({
                quantity: count,
                product_id: id,
            })),
        };

        console.log('Enviando orden completa:', order);
        handlerCreateOrder(order).then(() => {
            handlerUpdateTableStatus(tableId, 'occupied');
            navigate('/tables');
        }).catch(error => {
            toast.error("Error al enviar la orden: " + error.message);
        });
    };

    return (
        <div>
            <NavEmployes />
            <div className='flex flex-row bg-science-blue-900 p-5 rounded-2xl my-5 w-full justify-center'>
                {selectedTable ? <h1 className='font-bold text-white'>MESA {selectedTable.id}</h1> : <h1>...</h1>}
            </div>
            <ToastContainer />
            {/* Aquí puedes incluir más UI si es necesario */}
            <OrderWaiters />
            <button
                className='font-bold text-white border p-1 w-32 rounded-3xl bg-science-blue-600 transition duration-300 ease-in-out transform  hover:scale-110'
                onClick={() => enviarOrdenCompleta()}
                disabled={products.filter(product => product.count > 0).length === 0}
            >
                Enviar Orden
            </button>
        </div>
    );
};

export default NewOrder;